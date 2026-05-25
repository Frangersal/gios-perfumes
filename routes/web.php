<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\CustomerController as AdminCustomerController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

// --- FRONTEND ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/product/{id?}', [ProductController::class, 'show'])->name('product.show');
Route::get('/categoria/{slug?}', [CategoryController::class, 'show'])->name('category.show');

Route::get('/marcas', [BrandController::class, 'index'])->name('brands.index');
Route::get('/marcas/{slug}', [BrandController::class, 'show'])->name('brands.show');

// --- RUTAS PROTEGIDAS DEL CLIENTE ---
// Todo lo de adentro requerirá que el usuario haya iniciado sesión
Route::middleware('auth')->group(function () {
    Route::resource('wishlist', WishlistController::class);
    Route::resource('cart', CartController::class);
    Route::resource('checkout', CheckoutController::class);
    Route::resource('profile', ProfileController::class);
});

// Rutas informativas
Route::get('/search', [PageController::class, 'search'])->name('search');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/terms', [PageController::class, 'terms'])->name('terms');
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');


// --- DASHBOARD ADMINISTRATIVO ---
Route::prefix('admin')->name('admin.')->group(function () {
    
    // Auth de administradores
    Route::get('/login', [AdminAuthController::class, 'login'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'authenticate'])->name('login.post');
    
    // ZONA PROTEGIDA DE ADMINISTRADORES
    Route::middleware('auth')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Rutas tipo Resource para los CRUDS administrativos completos
        Route::resource('products', AdminProductController::class);
        Route::resource('orders', AdminOrderController::class);
        Route::resource('customers', AdminCustomerController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('brands', AdminBrandController::class);
    });
});

// --- AUTENTICACIÓN USUARIOS FRONTEND ---
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate'])->name('login.post');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// Fallback para 404
Route::fallback(function () {
    return response()->view('welcome', ['page' => 'not-found'], 404);
});
