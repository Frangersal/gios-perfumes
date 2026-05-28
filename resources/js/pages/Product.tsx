import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import ProductGallery from '../layouts/Product/ProductGallery';
import ProductInfo from '../layouts/Product/ProductInfo';
import OlfactoryNotes from '../layouts/Product/OlfactoryNotes';
import ProductReviews from '../layouts/Product/ProductReviews';
import RelatedProducts from '../layouts/Product/RelatedProducts';
import PromoBar from '../layouts/Index/PromoBar';

export default function Product() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="container mt-5">
                <div className="row mb-5">
                    {/* Columna Izquierda: Galería */}
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <ProductGallery />
                    </div>
                    
                    {/* Columna Derecha: Información Principal */}
                    <div className="col-lg-6 px-lg-5">
                        <ProductInfo />
                        <OlfactoryNotes />
                    </div>
                </div>
                
                {/* Fila Completa Central: Reseñas */}
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <ProductReviews />
                    </div>
                </div>
                
                {/* Productos Relacionados */}
                <RelatedProducts />
            </main>

            <Footer />
        </div>
    );
}
