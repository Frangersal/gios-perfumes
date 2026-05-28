import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Index/Card';
import CategorySort from './CategorySort';
import CategoryPagination from './CategoryPagination';

interface ProductImage {
    id: number;
    image: string;
    is_main: boolean;
}

interface CategoryProduct {
    id: number;
    name: string;
    price: number | string;
    discount_price?: number | string | null;
    brand?: { name?: string };
    images?: ProductImage[];
}

interface CategoryProductsResponse {
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    data: CategoryProduct[];
}

export default function CategoryGrid() {
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';

    const [products, setProducts] = useState<CategoryProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [total, setTotal] = useState(0);

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    const getMainImage = (product: CategoryProduct): string => {
        const images = Array.isArray(product.images) ? product.images : [];
        const mainImage = images.find((img) => Boolean(img?.is_main)) || images[0];
        return normalizeImageUrl(mainImage?.image || '');
    };

    const formatPrice = (value?: number | string | null): string => {
        const amount = Number(value ?? 0);
        return amount.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
        });
    };

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams(window.location.search);
                params.set('page', String(currentPage));
                params.set('per_page', '9');

                const requestUrl = `${window.location.pathname}?${params.toString()}`;

                const response = await axios.get<CategoryProductsResponse>(requestUrl, {
                    headers: { Accept: 'application/json' },
                });

                setProducts(Array.isArray(response.data.data) ? response.data.data : []);
                setCurrentPage(response.data.current_page || 1);
                setLastPage(response.data.last_page || 1);
                setFrom(response.data.from || 0);
                setTo(response.data.to || 0);
                setTotal(response.data.total || 0);
            } catch (error) {
                console.error('Error cargando productos de categoria', error);
                setProducts([]);
                setFrom(0);
                setTo(0);
                setTotal(0);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [currentPage]);

    return (
        <section>
            <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
                <span className="text-muted">
                    {loading
                        ? 'Cargando resultados...'
                        : `Mostrando ${from}-${to} de ${total} resultados`}
                </span>
                <CategorySort />
            </div>

            {loading ? (
                <div className="text-center text-muted py-5">Cargando productos...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-muted py-5">No hay productos disponibles en esta categoría.</div>
            ) : (
                <div className="row g-4 mb-5">
                    {products.map((product) => {
                        const regularPrice = Number(product.price || 0);
                        const discountedPrice = Number(product.discount_price || 0);
                        const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;

                        return (
                            <div key={product.id} className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                                <Card
                                    brand={product.brand?.name || 'Gio\'s Selection'}
                                    name={product.name}
                                    currentPrice={formatPrice(hasDiscount ? discountedPrice : regularPrice)}
                                    oldPrice={hasDiscount ? formatPrice(regularPrice) : undefined}
                                    image={getMainImage(product)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="pb-5">
                <CategoryPagination
                    currentPage={currentPage}
                    lastPage={lastPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </section>
    );
}