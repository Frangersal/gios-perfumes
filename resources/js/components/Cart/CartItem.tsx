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
        <div className="card mb-3 border-0 shadow-sm">
            <div className="row g-0">
                <div className="col-md-3">
                    <img
                        src={normalizeImageUrl(imageUrl)}
                        className="img-fluid rounded-start h-100 object-fit-cover"
                        alt={productName}
                    />
                </div>
                <div className="col-md-9">
                    <div className="card-body d-flex flex-column h-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 className="card-title fw-bold mb-1">{productName}</h5>
                                <p className="card-text text-muted small mb-0">Tamaño: {variantVolume}</p>
                                <p className="card-text text-muted small mb-0">Precio unitario: {formatPrice(unitPrice)}</p>
                            </div>
                            <h5 className="fw-bold text-primary mb-0">{formatPrice(itemTotal)}</h5>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                            <div className="input-group" style={{ width: '120px' }}>
                                <button className="btn btn-outline-secondary btn-sm px-2" type="button" onClick={onDecrease}>-</button>
                                <input type="text" className="form-control form-control-sm text-center" value={quantity} readOnly />
                                <button className="btn btn-outline-secondary btn-sm px-2" type="button" onClick={onIncrease}>+</button>
                            </div>
                            <button className="btn btn-link text-danger p-0 text-decoration-none small" onClick={onRemove}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
