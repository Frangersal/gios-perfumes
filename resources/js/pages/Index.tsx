import React from 'react';
import Navbar from '../layouts/Navbar';
import PromoBar from '../layouts/PromoBar';
import Footer from '../layouts/Footer';
import Carrusel from '../layouts/Carrusel';
import ProductsGrid from '../layouts/ProductsGrid';
import BrandCarousel from '../layouts/BrandCarousel';

export default function Index() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />
            
            <Carrusel />

            <main className="container mt-5 grow">
                <ProductsGrid />
                
                <BrandCarousel />
                
                <hr className="my-5" />

                {/* 
                <h1 className="text-primary">Hello world!</h1>
                <h2>Bienvenidos a Gio's Perfumes</h2>
                <div className="mt-4">
                    <button className="btn btn-primary me-2">Comprar Perfume</button>
                    <button className="btn btn-success">Ver Catálogo</button>
                </div>
                */}
            </main>

            <Footer />
        </div>
    );
}