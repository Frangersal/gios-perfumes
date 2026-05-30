<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('welcome', ['page' => 'cart']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_variant_id' => ['required', 'integer', 'exists:product_variants,id'],
            'quantity' => ['required', 'integer', 'min:1', 'max:99'],
            'cart_id' => ['nullable', 'integer'],
        ]);

        $variant = ProductVariant::findOrFail($data['product_variant_id']);

        if ($request->user()) {
            $cart = Cart::firstOrCreate(['user_id' => $request->user()->id]);
        } else {
            $guestCartId = $data['cart_id'] ?? null;
            $cart = null;

            if ($guestCartId) {
                $cart = Cart::where('id', $guestCartId)
                    ->whereNull('user_id')
                    ->first();
            }

            if (!$cart) {
                $cart = Cart::create(['user_id' => null]);
            }
        }

        $existingItem = CartItem::where('cart_id', $cart->id)
            ->where('product_variant_id', $variant->id)
            ->first();

        if ($existingItem) {
            $existingItem->quantity += (int) $data['quantity'];
            $existingItem->price = $variant->price;
            $existingItem->save();
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_variant_id' => $variant->id,
                'quantity' => (int) $data['quantity'],
                'price' => $variant->price,
            ]);
        }

        $itemCount = CartItem::where('cart_id', $cart->id)->sum('quantity');

        return response()->json([
            'ok' => true,
            'message' => 'Producto agregado al carrito',
            'cart_id' => $cart->id,
            'item_count' => $itemCount,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

