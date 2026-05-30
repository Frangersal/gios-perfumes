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

export default function WishlistCard({
    productId,
    name,
    brand,
    image,
    currentPrice,
    oldPrice,
    onRemove,
}: WishlistCardProps) {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const productUrl = `${baseUrl}/product/${productId}`;

    return (
        <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden">
            <button
                type="button"
                className="btn btn-light position-absolute rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0"
                title="Quitar de la wishlist"
                aria-label="Quitar de la wishlist"
                style={{ top: '10px', right: '10px', width: '35px', height: '35px', zIndex: 2 }}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(productId);
                }}
            >
                <span className="text-danger fw-bold">&times;</span>
            </button>

            <a href={productUrl} className="text-decoration-none text-dark d-flex flex-column h-100">
                <img
                    src={image || 'https://placehold.co/300x300/e9ecef/212529?text=Perfume'}
                    className="card-img-top"
                    alt={name}
                    style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                    <small className="text-muted text-uppercase fw-semibold">{brand}</small>
                    <h5 className="card-title fw-bold mt-1">{name}</h5>
                    <div className="d-flex flex-column align-items-start gap-1 mb-3">
                        {oldPrice && <span className="text-muted text-decoration-line-through small">{oldPrice}</span>}
                        <span className="text-dark fw-bold">{currentPrice}</span>
                    </div>
                    <div className="mt-auto">
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

