import React from 'react';

interface CardProps {
    brand?: string;
    name?: string;
    rating?: number;
    currentPrice?: string;
    oldPrice?: string;
    image?: string;
    wishlistActive?: boolean;
}

const defaultImage = 'https://placehold.co/640x640/f4f1ec/212529?text=Perfume';

export default function Card({
    brand = 'Gio\'s Selection',
    name = 'Perfume Especial',
    rating = 4.5,
    currentPrice = '$2,450.00',
    oldPrice,
    image = defaultImage,
    wishlistActive = false,
}: CardProps) {
    return (
        <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden" style={{ width: '18rem' }}>
            <button
                type="button"
                className="btn btn-light position-absolute rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
                aria-label={wishlistActive ? 'Quitar de wishlist' : 'Agregar a wishlist'}
                title={wishlistActive ? 'Quitar de wishlist' : 'Agregar a wishlist'}
                style={{ top: '12px', right: '12px', width: '38px', height: '38px', zIndex: 2 }}
            >
                <span className={wishlistActive ? 'text-danger fs-4' : 'text-secondary fs-4'}>
                    {wishlistActive ? '♥' : '♡'}
                </span>
            </button>

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
                    <button className="btn btn-dark w-100 fw-semibold">Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
}