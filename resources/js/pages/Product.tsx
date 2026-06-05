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

import '../../css/pages/index.css';
import '../../css/pages/product.css';

export default function Product() {
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';
    const productId = rootEl?.getAttribute('data-resource-id') || '';

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!productId) return;

        axios.get(`${baseUrl}/product/${productId}`, {
            headers: { Accept: 'application/json' },
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

            <main className="grow gp-luxury">
                {loading ? (
                    <div className="gp-product-state">Cargando piezas exclusivas…</div>
                ) : !product ? (
                    <div className="gp-product-state">Producto no encontrado.</div>
                ) : (
                    <>
                        <nav className="gp-product-breadcrumb" aria-label="breadcrumb">
                            <a href={`${baseUrl}/`}>Inicio</a>
                            <span className="gp-product-breadcrumb__sep">/</span>
                            {product.category?.name && (
                                <>
                                    <a href={`${baseUrl}/shop`}>{product.category.name}</a>
                                    <span className="gp-product-breadcrumb__sep">/</span>
                                </>
                            )}
                            <span className="gp-product-breadcrumb__current">{product.name}</span>
                        </nav>

                        <section className="gp-product-main">
                            <ProductGallery images={product.images ?? []} baseUrl={baseUrl} />

                            <div>
                                <ProductInfo product={product} baseUrl={baseUrl} />
                                <OlfactoryNotes productNotes={product.product_notes ?? []} />
                            </div>
                        </section>

                        <ProductReviews reviews={product.reviews ?? []} />

                        <RelatedProducts categoryId={product.category_id} excludeId={product.id} baseUrl={baseUrl} />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
