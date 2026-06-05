import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCardLuxury from '../../../components/Index/luxury/ProductCardLuxury';

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
    brand?: { name?: string };
    images?: ProductImage[];
}

interface NewArrivalsProps {
    eyebrow?: string;
    title?: React.ReactNode;
    description?: string;
    limit?: number;
    badge?: string;
}

export default function NewArrivals({
    eyebrow = 'Recién llegados',
    title = <>Las <em>novedades</em> que querrás llevar puestas</>,
    description = 'Las últimas incorporaciones a nuestro catálogo, seleccionadas por nuestro equipo de expertos en perfumería.',
    limit = 8,
    badge = 'NUEVO',
}: NewArrivalsProps) {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) return url;
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
        return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    };

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const response = await axios.get(`${baseUrl}/`, { headers: { Accept: 'application/json' } });
                const list = Array.isArray(response.data) ? response.data : [];
                const unique = Array.from(new Map(list.map((p: ProductItem) => [p.id, p])).values()).slice(0, limit);
                if (!cancelled) setProducts(unique);
            } catch (error) {
                console.error('Error cargando novedades', error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [baseUrl, limit]);

    return (
        <section className="gp-section">
            <div className="gp-section__head">
                <span className="gp-eyebrow">{eyebrow}</span>
                <h2>{title}</h2>
                <span className="gp-divider" />
                {description && <p>{description}</p>}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--gp-mute)', padding: '2rem 0' }}>
                    Cargando piezas exclusivas…
                </div>
            ) : products.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--gp-mute)', padding: '2rem 0' }}>
                    Próximamente nuevas fragancias.
                </div>
            ) : (
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
                                badge={hasDiscount ? 'OFERTA' : badge}
                                badgeVariant={hasDiscount ? 'gold' : 'dark'}
                            />
                        );
                    })}
                </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                <a href={`${baseUrl}/shop`} className="gp-btn gp-btn-outline">
                    Ver toda la colección
                </a>
            </div>
        </section>
    );
}
