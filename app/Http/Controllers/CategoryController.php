<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function show(Request $request, $slug = null)
    {
        if ($request->wantsJson() || $request->ajax()) {
            $perPage = (int) $request->query('per_page', 9);
            $perPage = max(1, min($perPage, 24));

            $query = Product::query()
                ->with([
                    'brand:id,name',
                    'images' => function ($imageQuery) {
                        $imageQuery->select(['id', 'product_id', 'image', 'is_main'])
                            ->orderByDesc('is_main')
                            ->orderBy('id');
                    },
                ])
                ->whereIn('status', ['publicado', 'active'])
                ->orderByDesc('created_at');

            if (!empty($slug)) {
                $category = Category::query()
                    ->get(['id', 'name'])
                    ->first(fn (Category $item) => Str::slug($item->name) === $slug);

                if ($category) {
                    $query->where('category_id', $category->id);
                }
            }

            return response()->json(
                $query->paginate($perPage)->appends($request->query())
            );
        }

        return view('welcome', ['page' => 'category']);
    }
}
