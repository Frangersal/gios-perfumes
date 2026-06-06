<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            $products = Product::query()
                ->with([
                    'brand:id,name',
                    'variants:id,product_id,price,discount_price',
                    'images' => function ($query) {
                        $query->select(['id', 'product_id', 'image', 'is_main'])
                            ->orderByDesc('is_main')
                            ->orderBy('id');
                    },
                ])
                ->whereIn('status', ['publicado', 'active'])
                ->orderByDesc('created_at')
                ->limit(8)
                ->get(['id', 'brand_id', 'name', 'status', 'created_at']);

            return response()->json($products);
        }

        return view('welcome', ['page' => 'index']);
    }
}
