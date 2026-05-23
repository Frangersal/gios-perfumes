<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // Más adelante puedes mover esto a un HomeController@index
    return view('welcome', ['page' => 'index']);
})->name('home');

Route::get('/shop', function () {
    // Más adelante puedes mover esto a un ShopController@index
    return view('welcome', ['page' => 'shop']);
})->name('shop');

Route::get('/product/{id?}', function () {
    // Más adelante puedes mover esto a un ProductController@show
    return view('welcome', ['page' => 'product']);
})->name('product.show');

Route::get('/categoria/{slug?}', function () {
    // Más adelante puedes mover esto a un CategoryController@show
    return view('welcome', ['page' => 'category']);
})->name('category.show');

Route::get('/marcas', function () {
    // Listado general de marcas (BrandController@index)
    return view('welcome', ['page' => 'brands']);
})->name('brands.index');

Route::get('/marcas/{slug}', function () {
    // Vista individual de una marca (BrandController@show)
    return view('welcome', ['page' => 'brand-detail']);
})->name('brands.show');

Route::get('/wishlist', function () {
    // Listado de favoritos del usuario (WishlistController@index)
    return view('welcome', ['page' => 'wishlist']);
})->name('wishlist.index');

Route::get('/cart', function () {
    return view('welcome', ['page' => 'cart']);
})->name('cart.index');

Route::get('/checkout', function () {
    return view('welcome', ['page' => 'checkout']);
})->name('checkout.index');

Route::get('/profile', function () {
    return view('welcome', ['page' => 'profile']);
})->name('profile');

// Rutas informativas
Route::get('/search', function () { return view('welcome', ['page' => 'search']); })->name('search');
Route::get('/about', function () { return view('welcome', ['page' => 'about']); })->name('about');
Route::get('/contact', function () { return view('welcome', ['page' => 'contact']); })->name('contact');
Route::get('/faq', function () { return view('welcome', ['page' => 'faq']); })->name('faq');
Route::get('/terms', function () { return view('welcome', ['page' => 'terms']); })->name('terms');
Route::get('/privacy', function () { return view('welcome', ['page' => 'privacy']); })->name('privacy');

// Fallback para 404
Route::fallback(function () {
    return response()->view('welcome', ['page' => 'not-found'], 404);
});

// Las rutas de auth se pueden reescribir con las de Laravel Breeze / Jetstream en el futuro.
Route::get('/login', function () {
    return view('welcome', ['page' => 'login']);
})->name('login');

Route::get('/register', function () {
    return view('welcome', ['page' => 'register']);
})->name('register');
