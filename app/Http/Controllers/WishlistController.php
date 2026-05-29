<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    /**
     * Lista la wishlist del usuario. Devuelve JSON si se pide.
     */
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            $userId = Auth::id();
            $products = Product::whereIn('id', function ($q) use ($userId) {
                $q->select('product_id')->from('wishlists')->where('user_id', $userId);
            })
                ->with(['brand', 'images', 'variants'])
                ->get();

            return response()->json([
                'ok' => true,
                'items' => $products,
            ]);
        }

        return view('welcome', ['page' => 'wishlist']);
    }

    public function create()
    {
        //
    }

    /**
     * Toggle: si el producto no está en la wishlist lo agrega, si está lo quita.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['ok' => false, 'message' => 'No autenticado.'], 401);
        }

        $existing = Wishlist::where('user_id', $userId)
            ->where('product_id', $data['product_id'])
            ->first();

        if ($existing) {
            $existing->delete();
            $inWishlist = false;
        } else {
            Wishlist::create([
                'user_id' => $userId,
                'product_id' => $data['product_id'],
            ]);
            $inWishlist = true;
        }

        $count = Wishlist::where('user_id', $userId)->count();

        return response()->json([
            'ok' => true,
            'in_wishlist' => $inWishlist,
            'product_id' => (int) $data['product_id'],
            'count' => $count,
        ]);
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Elimina un producto de la wishlist por su product_id.
     */
    public function destroy(string $id)
    {
        $userId = Auth::id();
        if (!$userId) {
            return response()->json(['ok' => false, 'message' => 'No autenticado.'], 401);
        }

        Wishlist::where('user_id', $userId)
            ->where('product_id', (int) $id)
            ->delete();

        return response()->json([
            'ok' => true,
            'product_id' => (int) $id,
            'count' => Wishlist::where('user_id', $userId)->count(),
        ]);
    }
}

