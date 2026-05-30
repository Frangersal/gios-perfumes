<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = Auth::user() && Auth::user()->roles->first()
                ? Auth::user()->roles->first()->name
                : 'Usuario Autenticado';

        return view('welcome', [
            'page' => 'profile',
            'userRole' => $role,
            'userName' => Auth::user()->name ?? 'Usuario'
        ]);
    }

    /**
     * Lista de pedidos del usuario autenticado (JSON).
     */
    public function orders(Request $request)
    {
        $userId = Auth::id();

        $orders = Order::where('user_id', $userId)
            ->withCount('items')
            ->orderByDesc('created_at')
            ->get()
            ->map(function (Order $order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'subtotal' => (float) $order->subtotal,
                    'shipping' => (float) $order->shipping,
                    'total' => (float) $order->total,
                    'payment_method' => $order->payment_method,
                    'tracking_number' => $order->tracking_number,
                    'created_at' => $order->created_at?->toIso8601String(),
                    'items_count' => (int) $order->items_count,
                ];
            });

        return response()->json([
            'ok' => true,
            'orders' => $orders,
        ]);
    }

    /**
     * Detalle de un pedido específico del usuario autenticado (JSON).
     */
    public function orderShow(Request $request, int $order)
    {
        $userId = Auth::id();

        $found = Order::with([
            'items.productVariant.product.images',
            'items.productVariant.product.brand',
        ])
            ->where('user_id', $userId)
            ->where('id', $order)
            ->first();

        if (!$found) {
            return response()->json(['ok' => false, 'message' => 'Pedido no encontrado.'], 404);
        }

        $baseUrl = rtrim(url('/'), '/');

        $items = $found->items->map(function ($item) use ($baseUrl) {
            $variant = $item->productVariant;
            $product = $variant?->product;
            $mainImage = $product?->images?->firstWhere('is_main', true) ?? $product?->images?->first();
            $imageFile = $mainImage?->image;
            $imageUrl = $imageFile
                ? "{$baseUrl}/resources/img/products/{$imageFile}"
                : null;

            return [
                'id' => $item->id,
                'product_id' => $product?->id,
                'product_name' => $product?->name,
                'brand' => $product?->brand?->name,
                'volume' => $variant?->volume,
                'quantity' => (int) $item->quantity,
                'price' => (float) $item->price,
                'total' => (float) $item->total,
                'image' => $imageUrl,
            ];
        });

        return response()->json([
            'ok' => true,
            'order' => [
                'id' => $found->id,
                'status' => $found->status,
                'subtotal' => (float) $found->subtotal,
                'shipping' => (float) $found->shipping,
                'total' => (float) $found->total,
                'payment_method' => $found->payment_method,
                'tracking_number' => $found->tracking_number,
                'created_at' => $found->created_at?->toIso8601String(),
                'items' => $items,
            ],
        ]);
    }

    public function create()
    {
        //
    }

    /**
     * Lista las direcciones del usuario autenticado (máximo 2).
     */
    public function addresses(Request $request)
    {
        $addresses = Address::where('user_id', Auth::id())
            ->orderBy('id')
            ->get(['id', 'country', 'region', 'city', 'postal_code', 'address', 'type']);

        return response()->json([
            'ok' => true,
            'max' => 2,
            'addresses' => $addresses,
        ]);
    }

    /**
     * Crea una nueva direccion para el usuario autenticado. Maximo 2.
     */
    public function storeAddress(Request $request)
    {
        $userId = Auth::id();
        $count = Address::where('user_id', $userId)->count();
        if ($count >= 2) {
            return response()->json([
                'ok' => false,
                'message' => 'Solo puedes tener hasta 2 direcciones guardadas.',
            ], 422);
        }

        $data = $request->validate([
            'country' => 'required|string|max:100',
            'region' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'address' => 'required|string',
            'type' => 'nullable|string|max:50',
        ]);
        $data['user_id'] = $userId;

        $address = Address::create($data);

        return response()->json([
            'ok' => true,
            'address' => $address->only(['id', 'country', 'region', 'city', 'postal_code', 'address', 'type']),
        ]);
    }

    /**
     * Actualiza una direccion existente del usuario autenticado.
     */
    public function updateAddress(Request $request, int $address)
    {
        $found = Address::where('user_id', Auth::id())->where('id', $address)->first();
        if (!$found) {
            return response()->json(['ok' => false, 'message' => 'Direccion no encontrada.'], 404);
        }

        $data = $request->validate([
            'country' => 'required|string|max:100',
            'region' => 'required|string|max:100',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'address' => 'required|string',
            'type' => 'nullable|string|max:50',
        ]);

        $found->update($data);

        return response()->json([
            'ok' => true,
            'address' => $found->only(['id', 'country', 'region', 'city', 'postal_code', 'address', 'type']),
        ]);
    }

    /**
     * Elimina una direccion del usuario autenticado.
     */
    public function destroyAddress(int $address)
    {
        $deleted = Address::where('user_id', Auth::id())->where('id', $address)->delete();
        if (!$deleted) {
            return response()->json(['ok' => false, 'message' => 'Direccion no encontrada.'], 404);
        }
        return response()->json(['ok' => true]);
    }

    /**
     * Devuelve los datos editables de la cuenta del usuario autenticado.
     */
    public function account(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'ok' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
            ],
        ]);
    }

    /**
     * Actualiza datos basicos del usuario autenticado.
     */
    public function updateAccount(Request $request)
    {
        $user = Auth::user();

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:30',
        ]);

        $user->fill($data);
        $user->save();

        return response()->json([
            'ok' => true,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
            ],
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

    public function destroy(string $id)
    {
        //
    }
}
