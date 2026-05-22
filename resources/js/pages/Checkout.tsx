import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import CheckoutForm from '../layouts/Checkout/CheckoutForm';
import CheckoutSummary from '../layouts/Checkout/CheckoutSummary';

export default function Checkout() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <main className="container flex-grow-1 mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-12 mb-4 text-center">
                        <h2 className="fw-bold">Finalizar Compra</h2>
                        <a href="/cart" className="text-decoration-none text-muted small">&lt; Volver al carrito</a>
                    </div>
                </div>

                <div className="row g-5 flex-md-row-reverse">
                    <div className="col-lg-5">
                        <CheckoutSummary />
                    </div>
                    <div className="col-lg-7">
                        <CheckoutForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
