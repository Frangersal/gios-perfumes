import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CardProps {
    brand?: string;
    name?: string;
    rating?: number;
    currentPrice?: string;
    oldPrice?: string;
    image?: string;
    wishlistActive?: boolean;
    productId?: number | string;
}

interface WishlistStorageItem {
    product_id: string;
    name: string;
    brand: string;
    image: string;
    current_price: string;
    old_price?: string;
}

const defaultImage = 'https://placehold.co/640x640/f4f1ec/212529?text=Perfume';
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

export default function Card({
    brand = 'Gio\'s Selection',
    name = 'Perfume Especial',
    rating = 4.5,
    currentPrice = '$2,450.00',
    oldPrice,
    image = defaultImage,
    wishlistActive = false,
    productId,
}: CardProps) {
    const root = document.getElementById('root');
    const baseUrl = root?.getAttribute('data-base-url') || '';
    const userRole = root?.getAttribute('data-user-role') || '';
    const isAuthed = userRole.trim() !== '';
    const productUrl = productId ? `${baseUrl}/product/${productId}` : '#';
    const idKey = productId !== undefined && productId !== null ? String(productId) : null;

    const [active, setActive] = useState<boolean>(wishlistActive);

    useEffect(() => {
        if (idKey === null) return;
        const items = readWishlist();
        setActive(items.some((it) => String(it.product_id) === idKey));

        const handleChange = () => {
            const fresh = readWishlist();
            setActive(fresh.some((it) => String(it.product_id) === idKey));
        };
        window.addEventListener('wishlist:changed', handleChange);
        return () => window.removeEventListener('wishlist:changed', handleChange);
    }, [idKey]);

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (idKey === null) return;

        const items = readWishlist();
        const exists = items.some((it) => String(it.product_id) === idKey);

        let nextItems: WishlistStorageItem[];
        if (exists) {
            nextItems = items.filter((it) => String(it.product_id) !== idKey);
        } else {
            nextItems = [
                ...items,
                {
                    product_id: idKey,
                    name,
                    brand,
                    image,
                    current_price: currentPrice,
                    old_price: oldPrice,
                },
            ];
        }
        writeWishlist(nextItems);
        setActive(!exists);

        if (isAuthed) {
            try {
                await axios.post(`${baseUrl.replace(/\/$/, '')}/wishlist`, {
                    product_id: idKey,
                });
            } catch (err) {
                // si falla la sincro al servidor, no revertimos la UI; el localStorage queda como verdad
                console.warn('No se pudo sincronizar la wishlist con el servidor', err);
            }
        }
    };

    return (
        <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden" style={{ width: '18rem' }}>
            <button
                type="button"
                className="btn btn-light position-absolute rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
                aria-label={active ? 'Quitar de wishlist' : 'Agregar a wishlist'}
                title={active ? 'Quitar de wishlist' : 'Agregar a wishlist'}
                style={{ top: '12px', right: '12px', width: '38px', height: '38px', zIndex: 2 }}
                onClick={handleToggleWishlist}
            >
                <span className={active ? 'text-danger fs-4' : 'text-secondary fs-4'}>
                    {active ? '♥' : '♡'}
                </span>
            </button>

            <a href={productUrl} className="text-decoration-none text-dark d-flex flex-column h-100">
                <img
                    src={image}
                    className="card-img-top"
                    alt={name}
                    style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-between gap-2 text-muted small">
                        <span className="fw-semibold text-uppercase">{brand}</span>
                        <span className="d-flex align-items-center gap-1">
                            <span className="text-warning">⭐</span>
                            <span className="fw-semibold">{rating.toFixed(1)}</span>
                        </span>
                    </div>

                    <h5 className="card-title fw-bold mb-0">{name}</h5>

                    <div className="d-flex flex-column align-items-start gap-1">
                        {oldPrice && <span className="text-muted text-decoration-line-through small">{oldPrice}</span>}
                        <span className="text-dark fw-bold fs-6">{currentPrice}</span>
                    </div>

                    <div className="mt-auto pt-2">
                        <button
                            className="btn btn-dark w-100 fw-semibold"
                            onClick={(e) => e.preventDefault()}
                        >
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </a>
        </div>
    );
}