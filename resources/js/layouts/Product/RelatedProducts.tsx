import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardLuxury from '../../components/Index/luxury/ProductCardLuxury';

interface RelatedProductsProps {
    categoryId?: number;
    excludeId?: number;
    baseUrl: string;
}

export default function RelatedProducts({ excludeId, baseUrl }: RelatedProductsProps) {
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
        <section className="gp-related">
            <div className="gp-related__inner">
                <div className="gp-related__head">
                    <span className="gp-eyebrow">Complementa tu colección</span>
                    <h2>
                        También te podría <em>gustar</em>
                    </h2>
                    <span className="gp-divider" />
                </div>

                <div className="gp-pgrid">
                    {products.map((product) => {
                        const regularPrice = Number(product.price || 0);
                        const discountedPrice = Number(product.discount_price || 0);
                        const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;

                        return (
                            <ProductCardLuxury
                                key={product.id}
                                productId={product.id}
                                brand={product.brand?.name || "Gio's Selection"}
                                name={product.name}
                                currentPrice={formatPrice(hasDiscount ? discountedPrice : regularPrice)}
                                oldPrice={hasDiscount ? formatPrice(regularPrice) : undefined}
                                image={getMainImage(product)}
                                badge={hasDiscount ? 'OFERTA' : undefined}
                                badgeVariant={hasDiscount ? 'gold' : 'dark'}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
