<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Category::withCount('products')
                    ->with('parent:id,name')
                    ->orderByDesc('id')
                    ->get()
            );
        }

        return view('welcome', ['page' => 'admin-categories']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-category-create']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'message' => 'Categoría creada con éxito',
            'category' => $category,
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Category::with([
                'parent:id,name',
                'products:id,category_id,name,sku,price,status',
            ])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-category-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        return view('welcome', ['page' => 'admin-category-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'image' => 'nullable|string|max:255',
            'parent_id' => [
                'nullable',
                'exists:categories,id',
                Rule::notIn([$category->id]),
            ],
        ]);

        $category->update($validated);

        return response()->json([
            'message' => 'Categoría actualizada con éxito',
            'category' => $category,
        ]);
    }

    public function destroy(string $id)
    {
        $category = Category::withCount('products')->findOrFail($id);

        if ($category->products_count > 0) {
            return response()->json([
                'message' => 'No se puede eliminar la categoría porque tiene productos asociados.',
            ], 422);
        }

        $category->delete();

        return response()->json(['message' => 'Categoría eliminada correctamente']);
    }
}
