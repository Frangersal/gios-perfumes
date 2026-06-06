<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Note::withCount(['products', 'productNotes'])
                    ->orderByDesc('id')
                    ->get()
            );
        }

        return view('welcome', ['page' => 'admin-notes']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-note-create']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:notes,name',
            'slug' => 'nullable|string|max:120|unique:notes,slug',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:5120',
        ]);

        $note = new Note([
            'name' => $validated['name'],
            'slug' => $this->resolveUniqueSlug($validated['slug'] ?? null, $validated['name']),
            'description' => $validated['description'] ?? null,
            'image' => null,
        ]);

        $note->save();

        $note->image = $this->resolveImagePath($request, $validated['image'] ?? null, $note->id, $note->name);
        $note->save();

        return response()->json([
            'message' => 'Nota creada con éxito',
            'note' => $note,
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Note::with([
                'productNotes:id,product_id,note_id,note_type_id,position,intensity',
                'productNotes.product:id,name,sku,status',
                'productNotes.product.variants:id,product_id,price,discount_price',
                'productNotes.noteType:id,name',
            ])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-note-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        return view('welcome', ['page' => 'admin-note-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:100', Rule::unique('notes', 'name')->ignore($note->id)],
            'slug' => ['nullable', 'string', 'max:120', Rule::unique('notes', 'slug')->ignore($note->id)],
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'image_file' => 'nullable|image|max:5120',
        ]);

        $note->name = $validated['name'];
        $note->slug = $this->resolveUniqueSlug($validated['slug'] ?? null, $validated['name'], $note->id);
        $note->description = $validated['description'] ?? null;
        $note->image = $this->resolveImagePath($request, $validated['image'] ?? $note->image, $note->id, $note->name);
        $note->save();

        return response()->json([
            'message' => 'Nota actualizada con éxito',
            'note' => $note,
        ]);
    }

    public function destroy(string $id)
    {
        $note = Note::withCount('productNotes')->findOrFail($id);

        if ($note->product_notes_count > 0) {
            return response()->json([
                'message' => 'No se puede eliminar la nota porque está asociada a productos.',
            ], 422);
        }

        $note->delete();

        return response()->json(['message' => 'Nota eliminada correctamente']);
    }

    private function resolveUniqueSlug(?string $slugInput, string $name, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug(trim((string) ($slugInput ?: $name)));
        $baseSlug = $baseSlug !== '' ? $baseSlug : Str::lower(Str::random(8));

        $candidate = $baseSlug;
        $counter = 1;

        while ($this->slugExists($candidate, $ignoreId)) {
            $candidate = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $candidate;
    }

    private function slugExists(string $slug, ?int $ignoreId = null): bool
    {
        $query = Note::where('slug', $slug);

        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }

    private function resolveImagePath(Request $request, ?string $fallback, int $noteId, string $noteName): ?string
    {
        if ($request->hasFile('image_file') && $request->file('image_file') instanceof UploadedFile) {
            return $this->storeNoteImageFile($request->file('image_file'), $noteId, $noteName);
        }

        $image = trim((string) ($request->input('image', $fallback ?? '')));
        return $image !== '' ? $image : null;
    }

    private function storeNoteImageFile(UploadedFile $file, int $noteId, string $noteName): string
    {
        $directory = base_path('resources/img/notes');
        if (!is_dir($directory)) {
            mkdir($directory, 0755, true);
        }

        $prefix = strtoupper(substr(preg_replace('/[^A-Za-z0-9]/', '', $noteName), 0, 3));
        $prefix = str_pad($prefix, 3, 'X');
        $extension = $file->getClientOriginalExtension() ?: 'jpg';
        $filename = 'GIO-NOTE-' . $prefix . '-' . $noteId . '.' . $extension;

        $file->move($directory, $filename);

        return '/resources/img/notes/' . $filename;
    }

    public function serveNoteImage(string $filename)
    {
        $safeFilename = basename($filename);
        $filePath = base_path('resources/img/notes/' . $safeFilename);

        if (!File::exists($filePath)) {
            abort(404);
        }

        return response()->file($filePath, [
            'Cache-Control' => 'public, max-age=604800',
        ]);
    }
}
