<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    public function index()
    {
        return view('welcome', ['page' => 'checkout']);
    }

    public function create()
    {
        //
    }

    /**
     * Crea una orden a partir de los items enviados desde el checkout.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_variant_id' => 'required|integer|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string|max:100',
            'shipping_method' => 'required|string|in:standard,express',
        ]);

        $userId = Auth::id();
        $shippingCost = $data['shipping_method'] === 'express' ? 199.00 : 0.00;

        try {
            $order = DB::transaction(function () use ($data, $userId, $shippingCost) {
                $variantIds = collect($data['items'])->pluck('product_variant_id')->all();
                $variants = ProductVariant::whereIn('id', $variantIds)->get()->keyBy('id');

                $subtotal = 0.0;
                $itemsToCreate = [];

                foreach ($data['items'] as $line) {
                    $variant = $variants->get($line['product_variant_id']);
                    if (!$variant) {
                        abort(422, 'Variante no encontrada: ' . $line['product_variant_id']);
                    }

                    $price = (float) $variant->price;
                    $qty = (int) $line['quantity'];
                    $lineTotal = round($price * $qty, 2);

                    $subtotal += $lineTotal;
                    $itemsToCreate[] = [
                        'product_variant_id' => $variant->id,
                        'quantity' => $qty,
                        'price' => $price,
                        'total' => $lineTotal,
                    ];
                }

                $subtotal = round($subtotal, 2);
                $total = round($subtotal + $shippingCost, 2);

                $order = Order::create([
                    'user_id' => $userId,
                    'status' => 'pendiente',
                    'subtotal' => $subtotal,
                    'shipping' => $shippingCost,
                    'total' => $total,
                    'payment_method' => $data['payment_method'],
                ]);

                foreach ($itemsToCreate as $row) {
                    $row['order_id'] = $order->id;
                    OrderItem::create($row);
                }

                return $order;
            });
        } catch (\Throwable $e) {
            if ($request->wantsJson() || $request->ajax()) {
                return response()->json([
                    'ok' => false,
                    'message' => 'No se pudo crear la orden.',
                    'error' => $e->getMessage(),
                ], 500);
            }
            throw $e;
        }

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'ok' => true,
                'message' => 'Orden creada correctamente.',
                'order_id' => $order->id,
                'order' => [
                    'id' => $order->id,
                    'status' => $order->status,
                    'subtotal' => $order->subtotal,
                    'shipping' => $order->shipping,
                    'total' => $order->total,
                    'payment_method' => $order->payment_method,
                    'created_at' => $order->created_at,
                ],
            ]);
        }

        return redirect()->route('home')->with('success', 'Orden #' . $order->id . ' creada.');
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

    public function destroy(string $id)
    {
        //
    }
}

