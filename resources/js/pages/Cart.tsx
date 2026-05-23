import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import CartList from '../layouts/Cart/CartList';
import CartSummary from '../layouts/Cart/CartSummary';

export default function Cart() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <main className="container mt-5 mb-5">
                <h2 className="fw-bold mb-5 text-center">Carrito de Compras</h2>
                
                <div className="row g-5">
                    <div className="col-lg-7 col-xl-8">
                        <CartList />
                    </div>
                    <div className="col-lg-5 col-xl-4">
                        <CartSummary />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
