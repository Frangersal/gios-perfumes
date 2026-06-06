<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Brand::withCount('products')
                    ->orderByDesc('id')
                    ->get()
            );
        }

        return view('welcome', ['page' => 'admin-brands']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-brand-create']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'banner' => 'nullable|string|max:255',
            'country_of_origin' => 'nullable|string|max:100',
            'logo' => 'nullable|string|max:255',
            'logo_file' => 'nullable|image|max:5120',
        ]);

        $brand = new Brand([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'banner' => $validated['banner'] ?? null,
            'country_of_origin' => $validated['country_of_origin'] ?? null,
            'logo' => null,
        ]);
        $brand->id ??= Brand::generateCreationBasedId();

        try {
            $brand->logo = $this->resolveLogoPath(
                $request,
                $validated['logo'] ?? null,
                $brand->id,
                $validated['name']
            );
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }
        $brand->save();

        return response()->json([
            'message' => 'Marca creada con éxito',
            'brand' => $brand,
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Brand::with([
                'products' => function ($query) {
                    $query->select(['id', 'brand_id', 'name', 'sku', 'status'])
                        ->with('variants:id,product_id,price,discount_price');
                },
            ])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-brand-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        return view('welcome', ['page' => 'admin-brand-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'banner' => 'nullable|string|max:255',
            'country_of_origin' => 'nullable|string|max:100',
            'logo' => 'nullable|string|max:255',
            'logo_file' => 'nullable|image|max:5120',
        ]);

        try {
            $validated['logo'] = $this->resolveLogoPath(
                $request,
                $validated['logo'] ?? $brand->logo,
                $brand->id,
                $validated['name']
            );
        } catch (\RuntimeException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        }

        $brand->update($validated);

        return response()->json([
            'message' => 'Marca actualizada con éxito',
            'brand' => $brand,
        ]);
    }

    public function destroy(string $id)
    {
        $brand = Brand::withCount('products')->findOrFail($id);

        if ($brand->products_count > 0) {
            return response()->json([
                'message' => 'No se puede eliminar la marca porque tiene productos asociados.',
            ], 422);
        }

        $brand->delete();

        return response()->json(['message' => 'Marca eliminada correctamente']);
    }

    private function resolveLogoPath(Request $request, ?string $fallback, int $brandId, string $brandName): ?string
    {
        if ($request->hasFile('logo_file') && $request->file('logo_file') instanceof UploadedFile) {
            return $this->storeBrandLogoFile($request->file('logo_file'), $brandId, $brandName);
        }

        $logo = trim((string) ($request->input('logo', $fallback ?? '')));
        return $logo !== '' ? $logo : null;
    }

    private function storeBrandLogoFile(UploadedFile $file, int $brandId, string $brandName): string
    {
        $directory = base_path('resources/img/brands');
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $cleanBrandName = preg_replace('/[^A-Za-z0-9]/', '', $brandName);
        $brandPrefix = strtoupper(Str::substr($cleanBrandName, 0, 3));
        $brandPrefix = str_pad($brandPrefix, 3, 'X');
        $filename = 'GIO-BRAND-' . $brandPrefix . '-LOGO-' . $brandId . '.webp';

        $targetPath = $directory . DIRECTORY_SEPARATOR . $filename;
        $this->convertToWebp($file, $targetPath);

        return '/resources/img/brands/' . $filename;
    }

    private function convertToWebp(UploadedFile $file, string $targetPath): void
    {
        $mime = $file->getMimeType();
        $sourcePath = $file->getPathname();

        $image = match ($mime) {
            'image/jpeg', 'image/jpg' => @imagecreatefromjpeg($sourcePath),
            'image/png' => @imagecreatefrompng($sourcePath),
            'image/gif' => @imagecreatefromgif($sourcePath),
            'image/webp' => @imagecreatefromwebp($sourcePath),
            default => null,
        };

        if (!$image) {
            throw new \RuntimeException('No se pudo procesar el archivo del logotipo para convertirlo a WebP.');
        }

        imagepalettetotruecolor($image);
        imagealphablending($image, true);
        imagesavealpha($image, true);

        $converted = imagewebp($image, $targetPath, 85);
        imagedestroy($image);

        if (!$converted) {
            throw new \RuntimeException('No se pudo convertir el logotipo a formato WebP.');
        }
    }

    public function serveBrandLogo(string $filename)
    {
        $safeFilename = basename($filename);
        $filePath = base_path('resources/img/brands/' . $safeFilename);

        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
