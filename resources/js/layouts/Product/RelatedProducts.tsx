import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Index/Card';

interface RelatedProductsProps {
    categoryId?: number;
    excludeId?: number;
    baseUrl: string;
}

export default function RelatedProducts({ categoryId, excludeId, baseUrl }: RelatedProductsProps) {
    const [products, setProducts] = useState<any[]>([]);

    const normalize = (url: string) => {
        if (!url) return '';
        if (/^https?:\/\//i.test(url)) return url;
        return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : '/' + url}`;
    };

    const getMainImage = (product: any) => {
        const images = Array.isArray(product?.images) ? product.images : [];
        const main = images.find((img: any) => img.is_main) || images[0];
        return normalize(main?.image || '');
    };

    const formatPrice = (value?: number | string | null) =>
        Number(value ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    useEffect(() => {
        if (!excludeId) return;

        axios.get(`${baseUrl}/product/${excludeId}/related`, {
            headers: { Accept: 'application/json' },
        })
            .then((res) => setProducts(res.data ?? []))
            .catch(() => setProducts([]));
    }, [excludeId, baseUrl]);

    if (products.length === 0) return null;

    return (
        <section className="mt-5 pt-5 mb-5 border-top">
            <h3 className="mb-4 text-center fw-bold">También te podría gustar</h3>
            <div className="row g-4 justify-content-center">
                {products.map((product) => {
                    const regularPrice = Number(product.price || 0);
                    const discountedPrice = Number(product.discount_price || 0);
                    const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;

                    return (
                        <div key={product.id} className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                            <Card
                                brand={product.brand?.name || "Gio's Selection"}
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
        </section>
    );
}
