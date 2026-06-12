import React, { useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import Card from '../components/Index/Card';

export default function Search() {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    const getMainImage = (product: any): string => {
        const images = Array.isArray(product.images) ? product.images : [];
        const mainImage = images.find((img: any) => Boolean(img?.is_main)) || images[0];
        return normalizeImageUrl(mainImage?.image || '');
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q') || '';
        setQuery(q);

        fetch(`/search?q=${encodeURIComponent(q)}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Error fetching search results:', err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            <SearchBar />
            
            <main className="container my-5 pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <h2 className="fw-bold mb-0">Resultados {query ? `para "${query}"` : ''}</h2>
                    <span className="text-muted">{products.length} productos encontrados</span>
                </div>
                
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2 justify-content-center">
                        {products.map((product) => (
                            <div className="col d-flex justify-content-center mb-4" key={product.id}>
                                <Card
                                    brand={product.brand?.name}
                                    name={product.name}
                                    currentPrice={`$${(product.discount_price ?? product.price ?? 0).toFixed(2)}`}
                                    oldPrice={product.discount_price ? `$${(product.price ?? 0).toFixed(2)}` : undefined}
                                    image={getMainImage(product) || undefined}
                                    productId={product.id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center my-5">
                        <h4 className="text-muted">No se encontraron productos para tu búsqueda.</h4>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
