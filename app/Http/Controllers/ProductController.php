<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show(Request $request, $id = null)
    {
        if ($request->wantsJson() || $request->ajax()) {
            $product = Product::with([
                'brand:id,name,country_of_origin',
                'category:id,name',
                'variants',
                'images' => function ($query) {
                    $query->orderByDesc('is_main')->orderBy('id');
                },
                'productNotes.note',
                'productNotes.noteType',
                'reviews',
            ])->findOrFail($id);

            return response()->json($product);
        }

        return view('welcome', ['page' => 'product', 'resourceId' => $id]);
    }

    public function related(Request $request, $id)
    {
        $product = Product::select('id', 'category_id')->findOrFail($id);

        $related = Product::with(['brand:id,name', 'images'])
            ->where('category_id', $product->category_id)
            ->where('id', '<>', $product->id)
            ->whereIn('status', ['publicado', 'active'])
            ->orderByDesc('created_at')
            ->limit(4)
            ->get();

        return response()->json($related);
    }
}
