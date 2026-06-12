import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';
    const productId = rootEl?.getAttribute('data-resource-id') || '';

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        // Se usa un query string distinto al de la navegación HTML (?format=json)
        // para evitar colisiones de caché del navegador entre la respuesta HTML y la JSON
        // cuando el usuario presiona "atrás" en el navegador.
        axios.get(`${baseUrl}/product/${productId}?format=json`, {
            headers: {
                Accept: 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
            .then((res) => setProduct(res.data))
            .catch((err) => console.error('Error cargando producto', err))
            .finally(() => setLoading(false));
    }, [baseUrl, productId]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            {loading ? (
                <main className="container mt-5 grow d-flex align-items-center justify-content-center">
                    <div className="text-muted fs-5">Cargando producto...</div>
                </main>
            ) : !product ? (
                <main className="container mt-5 grow d-flex align-items-center justify-content-center">
                    <div className="text-muted fs-5">Producto no encontrado.</div>
                </main>
            ) : (
                <main className="container mt-5">
                    <div className="row mb-5">
                        {/* Columna Izquierda: Galería */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <ProductGallery images={product.images ?? []} baseUrl={baseUrl} />
                        </div>

                        {/* Columna Derecha: Información Principal */}
                        <div className="col-lg-6 px-lg-5">
                            <ProductInfo product={product} baseUrl={baseUrl} />
                            <OlfactoryNotes productNotes={product.product_notes ?? []} />
                        </div>
                    </div>

                    {/* Reseñas */}
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <ProductReviews reviews={product.reviews ?? []} />
                        </div>
                    </div>

                    {/* Productos Relacionados */}
                    <RelatedProducts categoryId={product.category_id} excludeId={product.id} baseUrl={baseUrl} />
                </main>
            )}

            <Footer />
        </div>
    );
}
