import React from 'react';

interface CartSummaryProps {
    itemCount: number;
    subtotal: number;
    shipping: number;
    total: number;
}

export default function CartSummary({ itemCount, subtotal, shipping, total }: CartSummaryProps) {
    const formatPrice = (value: number) =>
        value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    return (
        <div className="card border-0 shadow-sm bg-light">
            <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Resumen del pedido</h4>
                
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Subtotal ({itemCount} artículo{itemCount === 1 ? '' : 's'})</span>
                    <span className="fw-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Envío</span>
                    <span className="text-success fw-bold">{shipping <= 0 ? 'Gratis' : formatPrice(shipping)}</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5 text-primary">{formatPrice(total)}</span>
                </div>
                
                <a
                    href={itemCount > 0 ? '/checkout' : '#'}
                    className={`btn w-100 py-3 text-uppercase fw-bold ${itemCount > 0 ? 'btn-dark' : 'btn-secondary disabled'}`}
                >
                    Proceder al pago
                </a>
                
                <div className="text-center mt-3">
                    <a href="/shop" className="text-decoration-none text-muted small">o Seguir comprando</a>
                </div>
            </div>
        </div>
    );
}
