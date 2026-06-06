<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                \App\Models\Product::with([
                    'category',
                    'brand',
                    'variants:id,product_id,price,discount_price',
                    'images' => function ($query) {
                        $query->select(['id', 'product_id', 'image', 'is_main'])
                            ->orderByDesc('is_main')
                            ->orderBy('id');
                    },
                ])->orderBy('id', 'desc')->get()
            );
        }
        return view('welcome', ['page' => 'admin-products']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-product-create']);
    }

    public function noteMetadata()
    {
        return response()->json([
            'notes' => \App\Models\Note::orderBy('name')->get(['id', 'name', 'image']),
            'note_types' => \App\Models\NoteType::orderBy('id')->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'slug' => 'required|string|max:191|unique:products',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:100|unique:products',
            'gender' => 'nullable|string|max:50',
            'olfactory_family' => 'nullable|string|max:100',
            'concentration' => 'nullable|string|max:50',
            'year' => 'nullable|integer',
            'country_of_origin' => 'nullable|string|max:100',
            'status' => 'required|string|max:50',
            'video_url' => 'nullable|url|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'product_notes' => 'nullable|array',
            'product_notes.*.note_id' => 'required_with:product_notes|exists:notes,id',
            'product_notes.*.note_type_id' => 'nullable|exists:note_types,id',
            'product_notes.*.position' => 'nullable|integer|min:1',
            'product_notes.*.intensity' => 'nullable|integer|min:1|max:10',
            'product_images' => 'required|array|min:1',
            'product_images.*.existing_image' => 'nullable|string|max:255',
            'product_images.*.image' => 'nullable|image|max:5120',
            'product_images.*.is_main' => 'nullable|boolean',
            'variants' => 'required|array|min:1',
            'variants.*.volume' => 'required|string|max:50',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.discount_price' => 'nullable|numeric|min:0',
            'variants.*.cost' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',
            'variants.*.min_stock' => 'nullable|integer|min:0',
        ]);

        $product = new Product(Arr::except($validated, ['product_notes', 'product_images', 'variants']));
        $product->id = $this->generateCreationBasedProductId();
        $product->save();
        $this->syncProductNotes($product, $validated['product_notes'] ?? []);
        $this->syncProductImages($product, $validated['product_images'] ?? []);
        $this->syncProductVariants($product, $validated['variants'] ?? []);
        return response()->json(['message' => 'Producto creado con éxito', 'product' => $product], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Product::with(['category', 'brand', 'notes', 'productNotes.noteType', 'images', 'variants'])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-product-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        // En lugar de pasar un productId, podemos obtener el ID directamente desde la URL en React,
        // pero pasarlo por la data es más robusto. De momento usamos la vista base.
        return view('welcome', ['page' => 'admin-product-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:200',
            'slug' => 'required|string|max:191|unique:products,slug,' . $id,
            'description' => 'nullable|string',
            'sku' => 'required|string|max:100|unique:products,sku,' . $id,
            'gender' => 'nullable|string|max:50',
            'olfactory_family' => 'nullable|string|max:100',
            'concentration' => 'nullable|string|max:50',
            'year' => 'nullable|integer',
            'country_of_origin' => 'nullable|string|max:100',
            'status' => 'required|string|max:50',
            'video_url' => 'nullable|url|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'meta_keywords' => 'nullable|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'product_notes' => 'nullable|array',
            'product_notes.*.note_id' => 'required_with:product_notes|exists:notes,id',
            'product_notes.*.note_type_id' => 'nullable|exists:note_types,id',
            'product_notes.*.position' => 'nullable|integer|min:1',
            'product_notes.*.intensity' => 'nullable|integer|min:1|max:10',
            'product_images' => 'required|array|min:1',
            'product_images.*.existing_image' => 'nullable|string|max:255',
            'product_images.*.image' => 'nullable|image|max:5120',
            'product_images.*.is_main' => 'nullable|boolean',
            'variants' => 'required|array|min:1',
            'variants.*.volume' => 'required|string|max:50',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.discount_price' => 'nullable|numeric|min:0',
            'variants.*.cost' => 'nullable|numeric|min:0',
            'variants.*.stock' => 'nullable|integer|min:0',
            'variants.*.min_stock' => 'nullable|integer|min:0',
        ]);

        $product->update(Arr::except($validated, ['product_notes', 'product_images', 'variants']));
        $this->syncProductNotes($product, $validated['product_notes'] ?? []);
        $this->syncProductImages($product, $validated['product_images'] ?? []);
        $this->syncProductVariants($product, $validated['variants'] ?? []);
        return response()->json(['message' => 'Producto actualizado con éxito', 'product' => $product]);
    }

    public function destroy(string $id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Producto eliminado correctamente']);
    }

    private function syncProductVariants(Product $product, array $variants): void
    {
        $product->variants()->delete();

        $rows = [];
        foreach ($variants as $item) {
            $volume = trim((string) ($item['volume'] ?? ''));
            if ($volume === '' || !isset($item['price']) || $item['price'] === '') {
                continue;
            }

            $rows[] = [
                'product_id' => $product->id,
                'volume' => $volume,
                'price' => (float) $item['price'],
                'discount_price' => isset($item['discount_price']) && $item['discount_price'] !== '' ? (float) $item['discount_price'] : null,
                'cost' => isset($item['cost']) && $item['cost'] !== '' ? (float) $item['cost'] : null,
                'stock' => isset($item['stock']) && $item['stock'] !== '' ? (int) $item['stock'] : 0,
                'min_stock' => isset($item['min_stock']) && $item['min_stock'] !== '' ? (int) $item['min_stock'] : 0,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if (!empty($rows)) {
            \App\Models\ProductVariant::insert($rows);
        }
    }

    private function syncProductNotes(Product $product, array $productNotes): void
    {
        $syncData = [];

        foreach ($productNotes as $item) {
            $noteId = isset($item['note_id']) ? (int) $item['note_id'] : 0;
            if ($noteId <= 0) {
                continue;
            }

            $syncData[$noteId] = [
                'note_type_id' => !empty($item['note_type_id']) ? (int) $item['note_type_id'] : null,
                'position' => !empty($item['position']) ? (int) $item['position'] : null,
                'intensity' => !empty($item['intensity']) ? (int) $item['intensity'] : null,
            ];
        }

        $product->notes()->sync($syncData);
    }

    private function syncProductImages(Product $product, array $productImages): void
    {
        $cleanImages = [];
        foreach ($productImages as $item) {
            $imagePath = '';

            if (isset($item['image']) && $item['image'] instanceof UploadedFile) {
                $imagePath = $this->storeProductImageFile($item['image']);
            } elseif (!empty($item['existing_image'])) {
                $imagePath = trim((string) $item['existing_image']);
            }

            if ($imagePath === '') {
                continue;
            }

            $cleanImages[] = [
                'image' => $imagePath,
                'is_main' => (bool) ($item['is_main'] ?? false),
            ];
        }

        if (empty($cleanImages)) {
            $product->images()->delete();
            return;
        }

        $hasMain = collect($cleanImages)->contains(fn ($img) => $img['is_main'] === true);
        if (!$hasMain) {
            $cleanImages[0]['is_main'] = true;
        }

        $product->images()->delete();
        $product->images()->createMany($cleanImages);
    }

    private function storeProductImageFile(UploadedFile $file): string
    {
        $directory = base_path('resources/img/products');
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        $filename = now()->format('YmdHis') . '_' . Str::random(12) . '.' . $extension;
        $file->move($directory, $filename);

        return '/resources/img/products/' . $filename;
    }

    private function generateCreationBasedProductId(): int
    {
        // 15 digitos: yyMMddHHmmss (12) + 3 aleatorios.
        do {
            $candidate = (int) (now()->format('ymdHis') . str_pad((string) random_int(0, 999), 3, '0', STR_PAD_LEFT));
        } while (Product::whereKey($candidate)->exists());

        return $candidate;
    }

    public function serveProductImage(string $filename)
    {
        $safeFilename = basename($filename);
        $filePath = base_path('resources/img/products/' . $safeFilename);

        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
