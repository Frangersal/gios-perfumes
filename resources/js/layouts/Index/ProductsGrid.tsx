import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Index/Card';

interface ProductImage {
    id: number;
    image: string;
    is_main: boolean;
}

interface ProductItem {
    id: number;
    name: string;
    price: number | string;
    discount_price?: number | string | null;
    brand?: {
        name?: string;
    };
    images?: ProductImage[];
}

export default function ProductsGrid() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    const getMainImage = (product: ProductItem): string => {
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
        const loadLatestProducts = async () => {
            try {
                const response = await axios.get(`${baseUrl}/`, {
                    headers: { Accept: 'application/json' },
                });
                const list = Array.isArray(response.data) ? response.data : [];
                // Deduplicar por id por si el endpoint devuelve repetidos
                const unique = Array.from(new Map(list.map((p: ProductItem) => [p.id, p])).values());
                setProducts(unique);
            } catch (error) {
                console.error('Error cargando novedades', error);
            } finally {
                setLoading(false);
            }
        };

        loadLatestProducts();
    }, [baseUrl]);

    return (
        <section className="mb-5">
            <h3 className="text-center mb-4 text-uppercase">Lo nuevo</h3>

            {loading ? (
                <div className="text-center text-muted py-4">Cargando productos...</div>
            ) : products.length === 0 ? (
                <div className="text-center text-muted py-4">Aun no hay productos nuevos para mostrar.</div>
            ) : (
                <div className="row g-4 justify-content-center">
                    {products.map((product) => {
                        const regularPrice = Number(product.price || 0);
                        const discountedPrice = Number(product.discount_price || 0);
                        const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;

                        return (
                            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
                                <Card
                                    brand={product.brand?.name || 'Gio\'s Selection'}
                                    name={product.name}
                                    currentPrice={formatPrice(hasDiscount ? discountedPrice : regularPrice)}
                                    oldPrice={hasDiscount ? formatPrice(regularPrice) : undefined}
                                    image={getMainImage(product)}
                                    productId={product.id}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}