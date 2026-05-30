import React, { useState } from 'react';

interface CheckoutItem {
    product_id: number;
    product_name: string;
    product_variant_id: number;
    variant_volume: string;
    price: number;
    quantity: number;
    image_url?: string;
}

interface CheckoutSummaryProps {
    items: CheckoutItem[];
    itemCount: number;
    subtotal: number;
    total: number;
}

export default function CheckoutSummary({ items, itemCount, subtotal, total }: CheckoutSummaryProps) {
    const [coupon, setCoupon] = useState('');
    const [couponMessage, setCouponMessage] = useState('');

    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const formatPrice = (value: number) =>
        value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    const normalizeImageUrl = (url?: string) => {
        if (!url) return 'https://placehold.co/80x80/e9ecef/212529?text=P';
        if (/^https?:\/\//i.test(url)) return url;
        const clean = url.startsWith('/') ? url : `/${url}`;
        return `${baseUrl.replace(/\/$/, '')}${clean}`;
    };

    const handleApplyCoupon = () => {
        if (!coupon.trim()) {
            setCouponMessage('Ingresa un código para aplicar.');
            return;
        }
        setCouponMessage('El código no es válido o ya expiró.');
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                <div className="d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Resumen del pedido</h5>
                    <span className="badge bg-dark rounded-pill">
                        {itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}
                    </span>
                </div>
            </div>

            <div className="card-body p-4">
                {/* Productos */}
                {items.length === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-muted mb-3">Tu carrito está vacío.</p>
                        <a href="/shop" className="btn btn-outline-dark btn-sm">Ir a la tienda</a>
                    </div>
                ) : (
                    <ul className="list-unstyled mb-0">
                        {items.map((item) => (
                            <li key={item.product_variant_id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                <div className="position-relative me-3 shrink-0">
                                    <img
                                        src={normalizeImageUrl(item.image_url)}
                                        alt={item.product_name}
                                        className="rounded border"
                                        width={64}
                                        height={64}
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="grow">
                                    <h6 className="mb-1 fw-semibold small">{item.product_name}</h6>
                                    <span className="badge bg-light text-dark border small">{item.variant_volume}</span>
                                </div>
                                <div className="fw-semibold text-end ms-2">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Cupón */}
                <div className="mb-3">
                    <label className="form-label small fw-semibold text-uppercase text-muted mb-2">
                        Código de descuento
                    </label>
                    <div className="input-group input-group-sm">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ingresa tu cupón"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <button
                            className="btn btn-outline-dark fw-semibold"
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={items.length === 0}
                        >
                            Aplicar
                        </button>
                    </div>
                    {couponMessage && (
                        <small className="text-danger d-block mt-2">{couponMessage}</small>
                    )}
                </div>

                <hr className="my-3" />

                {/* Totales */}
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Envío</span>
                    <span className="text-success fw-semibold">Gratis</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Impuestos</span>
                    <span className="text-muted small">Incluidos</span>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-4 text-dark">{formatPrice(total)}</span>
                </div>
                <p className="text-muted small mb-0">Precio final, sin cargos sorpresa.</p>
            </div>

            {/* Confianza */}
            <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                <ul className="list-unstyled small text-muted mb-0">
                    <li className="d-flex align-items-center mb-2">
                        <span className="me-2">🔒</span> Pago 100% seguro
                    </li>
                    <li className="d-flex align-items-center mb-2">
                        <span className="me-2">✅</span> Productos originales garantizados
                    </li>
                    <li className="d-flex align-items-center mb-0">
                        <span className="me-2">↩️</span> Cambios y devoluciones en 7 días
                    </li>
                </ul>
            </div>
        </div>
    );
}

