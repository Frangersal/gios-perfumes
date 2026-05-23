import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import WishlistGrid from '../layouts/Wishlist/WishlistGrid';

export default function Wishlist() {
    // Variable para simular si hay items o no. 
    // Puedes borrarla e inyectar {WishlistEmpty} más adelante.
    const hasItems = true; 

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <main className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
                    <h2 className="fw-bold m-0">Mi Wishlist</h2>
                    <span className="text-muted">3 perfumes guardados</span>
                </div>

                {hasItems ? <WishlistGrid /> : null}
            </main>

            <Footer />
        </div>
    );
}