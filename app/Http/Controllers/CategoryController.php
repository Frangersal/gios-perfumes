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
                    'variants:id,product_id,price,discount_price',
                    'images' => function ($imageQuery) {
                        $imageQuery->select(['id', 'product_id', 'image', 'is_main'])
                            ->orderByDesc('is_main')
                            ->orderBy('id');
                    },
                ])
                ->whereIn('status', ['publicado', 'active'])
                ->orderByDesc('created_at');

            $matchedCategory = null;

            if (!empty($slug)) {
                $matchedCategory = Category::query()
                    ->get(['id', 'name', 'description'])
                    ->first(fn (Category $item) => Str::slug($item->name) === $slug);

                if ($matchedCategory) {
                    $query->where('category_id', $matchedCategory->id);
                }
            }

            $paginated = $query->paginate($perPage)->appends($request->query());

            return response()->json(array_merge($paginated->toArray(), [
                'category' => $matchedCategory ? [
                    'id'          => $matchedCategory->id,
                    'name'        => $matchedCategory->name,
                    'slug'        => Str::slug($matchedCategory->name),
                    'description' => $matchedCategory->description,
                ] : null,
            ]));
        }

        return view('welcome', ['page' => 'category']);
    }
}
