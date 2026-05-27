<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        if ($request->wantsJson() || $request->ajax()) {
            return response()->json(
                User::whereHas('roles', function ($query) {
                    $query->where('name', 'Cliente');
                })
                    ->withCount(['orders', 'addresses'])
                    ->withSum('orders as total_spent', 'total')
                    ->orderByDesc('id')
                    ->get(['id', 'name', 'email', 'phone', 'created_at'])
            );
        }

        return view('welcome', ['page' => 'admin-customers']);
    }

    public function create()
    {
        return view('welcome', ['page' => 'admin-customer-create']);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:30',
            'password' => 'required|string|min:6|max:255',
        ]);

        $customer = User::create($validated);

        $customerRole = Role::firstOrCreate(
            ['name' => 'Cliente'],
            ['description' => 'Cliente comprador de la tienda']
        );

        $customer->roles()->syncWithoutDetaching([$customerRole->id]);

        return response()->json([
            'message' => 'Cliente creado con éxito',
            'customer' => $customer,
        ], 201);
    }

    public function show(string $id)
    {
        return response()->json(
            User::whereHas('roles', function ($query) {
                $query->where('name', 'Cliente');
            })->with([
                'roles:id,name',
                'addresses:id,user_id,country,region,city,postal_code,address,type',
                'orders:id,user_id,status,subtotal,shipping,total,payment_method,tracking_number,created_at',
            ])->findOrFail($id)
        );
    }

    public function details(string $id)
    {
        return view('welcome', ['page' => 'admin-customer-details', 'resourceId' => $id]);
    }

    public function edit(string $id)
    {
        return view('welcome', ['page' => 'admin-customer-edit', 'resourceId' => $id]);
    }

    public function update(Request $request, string $id)
    {
        $customer = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($customer->id)],
            'phone' => 'nullable|string|max:30',
            'password' => 'nullable|string|min:6|max:255',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $customer->update($validated);

        return response()->json([
            'message' => 'Cliente actualizado con éxito',
            'customer' => $customer,
        ]);
    }

    public function destroy(string $id)
    {
        $customer = User::withCount('orders')->findOrFail($id);

        if ($customer->orders_count > 0) {
            return response()->json([
                'message' => 'No se puede eliminar el cliente porque tiene pedidos asociados.',
            ], 422);
        }

        $customer->delete();

        return response()->json(['message' => 'Cliente eliminado correctamente']);
    }
}
