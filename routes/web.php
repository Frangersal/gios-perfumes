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
use App\Http\Controllers\Admin\NoteController as AdminNoteController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;

// --- FRONTEND ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop');
Route::get('/product/{id?}', [ProductController::class, 'show'])->name('product.show');
Route::get('/categoria/{slug?}', [CategoryController::class, 'show'])->name('category.show');

Route::get('/marcas', [BrandController::class, 'index'])->name('brands.index');
Route::get('/marcas/{slug}', [BrandController::class, 'show'])->name('brands.show');

// --- RUTAS PROTEGIDAS DEL CLIENTE ---
// Requiere login y tener el rol de 'Cliente'
Route::middleware(['auth', 'can:is-customer'])->group(function () {
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
    Route::post('/login', [AdminAuthController::class, 'authenticate'])->name('login.post')->middleware('throttle:10,600');
    
    // ZONA PROTEGIDA DE ADMINISTRADORES
    // Requiere login y acceso mínimo al dashboard (Vendedor, Almacenista, Soporte o Super admin)
    Route::middleware(['auth', 'can:view-admin-dashboard'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        
        // Rutas de Catálogo
        Route::get('products/{product}/details', [AdminProductController::class, 'details'])
            ->name('products.details')
            ->middleware('can:manage-catalog');
        Route::get('products-note-metadata', [AdminProductController::class, 'noteMetadata'])
            ->name('products.note-metadata')
            ->middleware('can:manage-catalog');
        Route::get('categories/{category}/details', [AdminCategoryController::class, 'details'])
            ->name('categories.details')
            ->middleware('can:manage-catalog');
        Route::get('brands/{brand}/details', [AdminBrandController::class, 'details'])
            ->name('brands.details')
            ->middleware('can:manage-catalog');
        Route::get('notes/{note}/details', [AdminNoteController::class, 'details'])
            ->name('notes.details')
            ->middleware('can:manage-catalog');
        Route::get('orders/{order}/details', [AdminOrderController::class, 'details'])
            ->name('orders.details')
            ->middleware('can:manage-orders');
        Route::resource('products', AdminProductController::class)->middleware('can:manage-catalog');
        Route::resource('categories', AdminCategoryController::class)->middleware('can:manage-catalog');
        Route::resource('brands', AdminBrandController::class)->middleware('can:manage-catalog');
        Route::resource('notes', AdminNoteController::class)->middleware('can:manage-catalog');
        
        // Rutas de Pedidos
        Route::resource('orders', AdminOrderController::class)->middleware('can:manage-orders');
        
        // Rutas de Clientes / Soporte
        Route::resource('customers', AdminCustomerController::class)->middleware('can:manage-customers');
    });
});

// --- AUTENTICACIÓN USUARIOS FRONTEND ---
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate'])->name('login.post')->middleware('throttle:10,600');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/register', [AuthController::class, 'store'])->name('register.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/resources/img/products/{filename}', [AdminProductController::class, 'serveProductImage'])
    ->where('filename', '[^/]+')
    ->name('products.images.show');

Route::get('/resources/img/brands/{filename}', [AdminBrandController::class, 'serveBrandLogo'])
    ->where('filename', '[^/]+')
    ->name('brands.logos.show');

Route::get('/resources/img/notes/{filename}', [AdminNoteController::class, 'serveNoteImage'])
    ->where('filename', '[^/]+')
    ->name('notes.images.show');


// Fallback para 404
Route::fallback(function () {
    return response()->view('welcome', ['page' => 'not-found'], 404);
});
