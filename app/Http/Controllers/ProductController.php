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

            return response()->json($product)
                ->header('Vary', 'Accept')
                ->header('Cache-Control', 'no-store, private, max-age=0, must-revalidate');
        }

        return response()
            ->view('welcome', ['page' => 'product', 'resourceId' => $id])
            ->header('Vary', 'Accept');
    }

    public function related(Request $request, $id)
    {
        $product = Product::select('id', 'category_id')->findOrFail($id);

        $related = Product::with(['brand:id,name', 'images', 'variants:id,product_id,price,discount_price'])
            ->where('category_id', $product->category_id)
            ->where('id', '<>', $product->id)
            ->whereIn('status', ['publicado', 'active'])
            ->orderByDesc('created_at')
            ->limit(4)
            ->get();

        return response()->json($related);
    }
}
