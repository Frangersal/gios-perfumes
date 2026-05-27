<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                Order::with([
                    'user:id,name,email',
                    'coupons:id,code,type,value',
                ])
                    ->withCount('items')
                    ->orderByDesc('id')
                    ->get()
            );
        }

        return view('welcome', ['page' => 'admin-orders']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-order-create']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|string|max:50',
            'subtotal' => 'required|numeric|min:0',
            'shipping' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'nullable|string|max:100',
            'tracking_number' => 'nullable|string|max:100',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Pedido creado con éxito',
            'order' => $order,
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            Order::with([
                'user:id,name,email',
                'coupons:id,code,type,value,active,start_date,end_date',
                'items:id,order_id,product_variant_id,quantity,price,total',
                'items.productVariant:id,product_id,volume,price,stock',
                'items.productVariant.product:id,name,sku',
            ])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-order-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        return view('welcome', ['page' => 'admin-order-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|max:50',
            'payment_method' => 'nullable|string|max:100',
            'tracking_number' => 'nullable|string|max:100',
            'shipping' => 'nullable|numeric|min:0',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Pedido actualizado con éxito',
            'order' => $order,
        ]);
    }

    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Pedido eliminado correctamente']);
    }
}
