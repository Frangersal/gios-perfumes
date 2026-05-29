import React from 'react';

export default function CartSummary() {
    return (
        <div className="card border-0 shadow-sm bg-light">
            <div className="card-body p-4">
                <h4 className="fw-bold mb-4">Resumen del pedido</h4>
                
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Subtotal (2 artículos)</span>
                    <span className="fw-bold">$4,900.00</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Envío</span>
                    <span className="text-success fw-bold">Gratis</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5 text-primary">$4,900.00</span>
                </div>
                
                <a href="/checkout" className="btn btn-dark w-100 py-3 text-uppercase fw-bold">
                    Proceder al pago
                </a>
                
                <div className="text-center mt-3">
                    <a href="/shop" className="text-decoration-none text-muted small">o Seguir comprando</a>
                </div>
            </div>
        </div>
    );
}
