import React from 'react';

interface CartItemProps {
    productName: string;
    variantVolume: string;
    imageUrl?: string;
    unitPrice: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
}

const placeholderImage = 'https://placehold.co/200x200/e9ecef/212529?text=Perfume';

export default function CartItem({
    productName,
    variantVolume,
    imageUrl,
    unitPrice,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
}: CartItemProps) {
    const formatPrice = (value: number) =>
        value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    const normalizeImageUrl = (url?: string) => {
        if (!url) return placeholderImage;
        if (/^https?:\/\//i.test(url)) return url;

        const rootEl = document.getElementById('root');
        const baseUrl = rootEl?.getAttribute('data-base-url') || '';
        const sanitizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${sanitizedBase}${normalizedPath}`;
    };

    const itemTotal = unitPrice * quantity;

    return (
        <div className="row g-3 align-items-center position-relative">
            <button
                type="button"
                className="btn-close position-absolute top-0 end-0 mt-1 me-2"
                style={{ fontSize: '0.7rem', zIndex: 2 }}
                onClick={onRemove}
                aria-label="Eliminar producto del carrito"
                title="Eliminar producto"
            ></button>

            <div className="col-4 col-md-2">
                <div className="ratio ratio-1x1 bg-light rounded overflow-hidden">
                    <img
                        src={normalizeImageUrl(imageUrl)}
                        className="w-100 h-100 object-fit-cover"
                        alt={productName}
                    />
                </div>
            </div>
            <div className="col-8 col-md-5 pe-4">
                <h6 className="fw-bold mb-1">{productName}</h6>
                <p className="text-muted small mb-1">
                    <span className="badge bg-light text-dark border me-1">{variantVolume}</span>
                </p>
                <p className="text-muted small mb-0">
                    Precio unitario: <span className="fw-semibold text-dark">{formatPrice(unitPrice)}</span>
                </p>
            </div>
            <div className="col-7 col-md-3">
                <div className="input-group input-group-sm" style={{ maxWidth: '130px' }}>
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={onDecrease}
                        aria-label="Disminuir cantidad"
                    >−</button>
                    <input
                        type="text"
                        className="form-control text-center fw-semibold"
                        value={quantity}
                        readOnly
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={onIncrease}
                        aria-label="Aumentar cantidad"
                    >+</button>
                </div>
            </div>
            <div className="col-5 col-md-2 text-end">
                <span className="fw-bold fs-5 text-dark">{formatPrice(itemTotal)}</span>
            </div>
        </div>
    );
}
