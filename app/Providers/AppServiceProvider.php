<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);

        // Intercepta todas las verificaciones. El 'Super admin' siempre tiene permiso a todo.
        Gate::before(function (User $user, $ability) {
            if ($user->hasRole('Super admin')) {
                return true;
            }
        });

        // Acceso general al panel de administración
        Gate::define('view-admin-dashboard', function (User $user) {
            // El Super Admin ya pasa por el before(). Autorizamos al resto del staff.
            return $user->hasRole(['Vendedor', 'Almacenista', 'Soporte']);
        });

        // Gestión del catálogo (crear, editar productos, categorías, marcas)
        Gate::define('manage-catalog', function (User $user) {
            return $user->hasRole(['Vendedor']);
        });

        // Gestión exhaustiva de inventario (actualizar stock de variantes)
        Gate::define('manage-inventory', function (User $user) {
            return $user->hasRole(['Almacenista']);
        });

        // Visualización y gestión de estados de Pedidos
        Gate::define('manage-orders', function (User $user) {
            // Vendedores (ventas), Almacenista (despachos/envíos), Soporte (dudas)
            return $user->hasRole(['Vendedor', 'Almacenista', 'Soporte']);
        });

        // Gestión de datos de Clientes, tickets o preguntas
        Gate::define('manage-customers', function (User $user) {
            return $user->hasRole(['Soporte', 'Vendedor']);
        });

        // Acciones exclusivas del cliente estándar (frontend)
        Gate::define('is-customer', function (User $user) {
            return $user->hasRole('Cliente');
        });
    }
}
