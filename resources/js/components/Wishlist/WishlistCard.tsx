import React from 'react';

interface WishlistCardProps {
    productId: number;
    name: string;
    brand: string;
    image: string;
    currentPrice: string;
    oldPrice?: string;
    onRemove: (productId: number) => void;
}

const DEFAULT_IMG = 'https://placehold.co/640x640/efe6d4/1c1814?text=Gio%27s';

export default function WishlistCard({
    productId,
    name,
    brand,
    image,
    currentPrice,
    oldPrice,
    onRemove,
}: WishlistCardProps) {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');
    const productUrl = `${baseUrl}/product/${productId}`;

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onRemove(productId);
    };

    return (
        <a href={productUrl} className="gp-pcard">
            <div className="gp-pcard__media">
                <button
                    type="button"
                    className="gp-pcard__remove"
                    aria-label="Quitar de la wishlist"
                    title="Quitar de la wishlist"
                    onClick={handleRemove}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="6" y1="6" x2="18" y2="18" />
                        <line x1="6" y1="18" x2="18" y2="6" />
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

                <div className="gp-pcard__price">
                    {oldPrice && <span className="gp-pcard__price-old">{oldPrice}</span>}
                    <span className="gp-pcard__price-current">{currentPrice}</span>
                </div>
            </div>
        </a>
    );
}

