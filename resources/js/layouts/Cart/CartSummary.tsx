import React, { useState } from 'react';

interface CartSummaryProps {
    itemCount: number;
    subtotal: number;
    total: number;
}

export default function CartSummary({ itemCount, subtotal, total }: CartSummaryProps) {
    const [coupon, setCoupon] = useState('');
    const [couponMessage, setCouponMessage] = useState('');

    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const checkoutUrl = `${baseUrl.replace(/\/$/, '')}/checkout`;

    const formatPrice = (value: number) =>
        value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    const handleApplyCoupon = () => {
        if (!coupon.trim()) {
            setCouponMessage('Ingresa un código para aplicar.');
            return;
        }
        setCouponMessage('El código no es válido o ya expiró.');
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <h5 className="fw-bold mb-4 border-bottom pb-3">Resumen del pedido</h5>

                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                        Subtotal <span className="small">({itemCount} artículo{itemCount === 1 ? '' : 's'})</span>
                    </span>
                    <span className="fw-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Descuentos</span>
                    <span className="text-muted">— $0.00</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Impuestos</span>
                    <span className="text-muted small">Incluidos</span>
                </div>

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
                            disabled={itemCount === 0}
                        >
                            Aplicar
                        </button>
                    </div>
                    {couponMessage && (
                        <small className="text-danger d-block mt-2">{couponMessage}</small>
                    )}
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-between align-items-baseline mb-1">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-4 text-dark">{formatPrice(total)}</span>
                </div>
                <p className="text-muted small mb-4">Precio final, sin cargos sorpresa.</p>

                <a
                    href={itemCount > 0 ? checkoutUrl : '#'}
                    className={`btn w-100 py-3 text-uppercase fw-bold ${itemCount > 0 ? 'btn-dark' : 'btn-secondary disabled'}`}
                    aria-disabled={itemCount === 0}
                >
                    Proceder al pago
                </a>

                {/* Beneficios / confianza */}
                <ul className="list-unstyled small text-muted mt-4 mb-0">
                    <li className="d-flex align-items-center mb-2">
                        <span className="me-2">🔒</span> Pago 100% seguro
                    </li>
                    <li className="d-flex align-items-center mb-2">
                        <span className="me-2">✅</span> Productos originales garantizados
                    </li>
                    <li className="d-flex align-items-center mb-2">
                        <span className="me-2">↩️</span> Cambios y devoluciones en 7 días
                    </li>
                </ul>

                {/* Métodos de pago */}
                <div className="mt-3 pt-3 border-top">
                    <p className="small text-muted mb-2">Métodos de pago aceptados:</p>
                    <div className="d-flex flex-wrap gap-2">
                        <span className="badge bg-light text-dark border">Visa</span>
                        <span className="badge bg-light text-dark border">Mastercard</span>
                        <span className="badge bg-light text-dark border">AMEX</span>
                        <span className="badge bg-light text-dark border">PayPal</span>
                        <span className="badge bg-light text-dark border">OXXO</span>
                        <span className="badge bg-light text-dark border">Transferencia</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
