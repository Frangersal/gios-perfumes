import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Category from './pages/Category';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminProductForm from './pages/AdminProductForm';
import AdminProductDetails from './pages/AdminProductDetails';
import AdminOrders from './pages/AdminOrders';
import AdminOrderForm from './pages/AdminOrderForm';
import AdminOrderDetails from './pages/AdminOrderDetails';
import AdminCustomers from './pages/AdminCustomers';
import AdminCategories from './pages/AdminCategories';
import AdminCategoryForm from './pages/AdminCategoryForm';
import AdminCategoryDetails from './pages/AdminCategoryDetails';
import AdminBrands from './pages/AdminBrands';
import AdminBrandForm from './pages/AdminBrandForm';
import AdminBrandDetails from './pages/AdminBrandDetails';
import AdminNotes from './pages/AdminNotes';
import AdminNoteForm from './pages/AdminNoteForm';
import AdminNoteDetails from './pages/AdminNoteDetails';

const container = document.getElementById('root');
if (container) {
    const page = container.getAttribute('data-page');
    const root = createRoot(container);
    
    // Dependiendo de la variable proveída por Laravel, montaremos la vista correcta
    if (page === 'shop') {
        root.render(<Shop />);
    } else if (page === 'product') {
        root.render(<Product />);
    } else if (page === 'category') {
        root.render(<Category />);
    } else if (page === 'brands') {
        root.render(<Brands />);
    } else if (page === 'brand-detail') {
        root.render(<BrandDetail />);
    } else if (page === 'wishlist') {
        root.render(<Wishlist />);
    } else if (page === 'cart') {
        root.render(<Cart />);
    } else if (page === 'checkout') {
        root.render(<Checkout />);
    } else if (page === 'login') {
        root.render(<Login />);
    } else if (page === 'register') {
        root.render(<Register />);
    } else if (page === 'profile') {
        root.render(<Profile />);
    } else if (page === 'search') {
        root.render(<Search />);
    } else if (page === 'about') {
        root.render(<About />);
    } else if (page === 'contact') {
        root.render(<Contact />);
    } else if (page === 'faq') {
        root.render(<FAQ />);
    } else if (page === 'terms') {
        root.render(<Terms />);
    } else if (page === 'privacy') {
        root.render(<Privacy />);
    } else if (page === 'admin-login') {
        root.render(<AdminLogin />);
    } else if (page === 'admin-dashboard') {
        root.render(<AdminDashboard />);
    } else if (page === 'admin-products') {
        root.render(<AdminProducts />);
    } else if (page === 'admin-product-create' || page === 'admin-product-edit') {
        root.render(<AdminProductForm />);
    } else if (page === 'admin-product-details') {
        root.render(<AdminProductDetails />);
    } else if (page === 'admin-categories') {
        root.render(<AdminCategories />);
    } else if (page === 'admin-category-create' || page === 'admin-category-edit') {
        root.render(<AdminCategoryForm />);
    } else if (page === 'admin-category-details') {
        root.render(<AdminCategoryDetails />);
    } else if (page === 'admin-brands') {
        root.render(<AdminBrands />);
    } else if (page === 'admin-brand-create' || page === 'admin-brand-edit') {
        root.render(<AdminBrandForm />);
    } else if (page === 'admin-brand-details') {
        root.render(<AdminBrandDetails />);
    } else if (page === 'admin-notes') {
        root.render(<AdminNotes />);
    } else if (page === 'admin-note-create' || page === 'admin-note-edit') {
        root.render(<AdminNoteForm />);
    } else if (page === 'admin-note-details') {
        root.render(<AdminNoteDetails />);
    } else if (page === 'admin-orders') {
        root.render(<AdminOrders />);
    } else if (page === 'admin-order-edit' || page === 'admin-order-create') {
        root.render(<AdminOrderForm />);
    } else if (page === 'admin-order-details') {
        root.render(<AdminOrderDetails />);
    } else if (page === 'admin-customers') {
        root.render(<AdminCustomers />);
    } else if (page === 'not-found') {
        root.render(<NotFound />);
    } else {
        root.render(<Index />);
    }
}
