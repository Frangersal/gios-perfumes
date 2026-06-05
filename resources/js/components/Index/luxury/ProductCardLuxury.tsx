import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProductCardLuxuryProps {
    brand?: string;
    name?: string;
    rating?: number;
    currentPrice?: string;
    oldPrice?: string;
    image?: string;
    productId?: number | string;
    badge?: string;
    badgeVariant?: 'dark' | 'gold';
}

interface WishlistStorageItem {
    product_id: number;
    name: string;
    brand: string;
    image: string;
    current_price: string;
    old_price?: string;
}

const DEFAULT_IMG = 'https://placehold.co/640x640/efe6d4/1c1814?text=Gio%27s';
const WISHLIST_KEY = 'gios_wishlist_items';

const readWishlist = (): WishlistStorageItem[] => {
    try {
        const raw = window.localStorage.getItem(WISHLIST_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeWishlist = (items: WishlistStorageItem[]) => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('wishlist:changed'));
};

export default function ProductCardLuxury({
    brand = "Gio's Selection",
    name = 'Perfume Especial',
    rating = 4.7,
    currentPrice = '$2,450.00',
    oldPrice,
    image = DEFAULT_IMG,
    productId,
    badge,
    badgeVariant = 'dark',
}: ProductCardLuxuryProps) {
    const root = document.getElementById('root');
    const baseUrl = root?.getAttribute('data-base-url') || '';
    const userRole = root?.getAttribute('data-user-role') || '';
    const isAuthed = userRole.trim() !== '';
    const productUrl = productId ? `${baseUrl}/product/${productId}` : '#';
    const numericId = productId !== undefined ? Number(productId) : null;

    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (numericId === null) return;
        const items = readWishlist();
        setActive(items.some((it) => it.product_id === numericId));

        const handleChange = () => {
            const fresh = readWishlist();
            setActive(fresh.some((it) => it.product_id === numericId));
        };
        window.addEventListener('wishlist:changed', handleChange);
        return () => window.removeEventListener('wishlist:changed', handleChange);
    }, [numericId]);

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (numericId === null) return;

        const items = readWishlist();
        const exists = items.some((it) => it.product_id === numericId);

        const nextItems: WishlistStorageItem[] = exists
            ? items.filter((it) => it.product_id !== numericId)
            : [
                  ...items,
                  {
                      product_id: numericId,
                      name,
                      brand,
                      image,
                      current_price: currentPrice,
                      old_price: oldPrice,
                  },
              ];

        writeWishlist(nextItems);
        setActive(!exists);

        if (isAuthed) {
            try {
                await axios.post(`${baseUrl.replace(/\/$/, '')}/wishlist`, {
                    product_id: numericId,
                });
            } catch (err) {
                console.warn('No se pudo sincronizar la wishlist con el servidor', err);
            }
        }
    };

    return (
        <a href={productUrl} className="gp-pcard">
            <div className="gp-pcard__media">
                {badge && (
                    <span className={`gp-pcard__badge${badgeVariant === 'gold' ? ' gp-pcard__badge--gold' : ''}`}>
                        {badge}
                    </span>
                )}

                <button
                    type="button"
                    className={`gp-pcard__wish${active ? ' is-active' : ''}`}
                    aria-label={active ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
                    title={active ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
                    onClick={handleToggleWishlist}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                <img src={image || DEFAULT_IMG} alt={name} loading="lazy" />

                <div className="gp-pcard__quick">
                    <button type="button" onClick={(e) => e.preventDefault()}>
                        Añadir al carrito
                    </button>
                </div>
            </div>

            <div className="gp-pcard__body">
                <span className="gp-pcard__brand">{brand}</span>
                <h3 className="gp-pcard__name">{name}</h3>

                <div className="gp-pcard__rating" aria-label={`Calificación ${rating.toFixed(1)} de 5`}>
                    <span className="gp-star" aria-hidden="true">★</span>
                    <span>{rating.toFixed(1)}</span>
                </div>

                <div className="gp-pcard__price">
                    {oldPrice && <span className="gp-pcard__price-old">{oldPrice}</span>}
                    <span className="gp-pcard__price-current">{currentPrice}</span>
                </div>
            </div>
        </a>
    );
}
