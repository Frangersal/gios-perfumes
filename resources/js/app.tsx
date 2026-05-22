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
    } else {
        root.render(<Index />);
    }
}
