import React from 'react';

export default function CheckoutSummary() {
    return (
        <div className="bg-light p-4 rounded border">
            <h4 className="fw-bold mb-4 border-bottom pb-2">Resumen del Pedido</h4>
            
            <div className="d-flex align-items-center mb-3">
                <div className="position-relative me-3">
                    <img src="https://placehold.co/80x80/e9ecef/212529?text=P" className="rounded border" alt="Perfume" />
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{ left: '100%' }}>
                        2
                    </span>
                </div>
                <div className="w-100">
                    <h6 className="mb-1 fw-bold">Aqua di Mare Essenza</h6>
                    <small className="text-muted d-block">50 ml</small>
                </div>
                <div className="fw-bold">$4,900.00</div>
            </div>
            
            <hr className="my-4" />
            
            <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Subtotal</span>
                <span>$4,900.00</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">Envío</span>
                <span className="text-success">Gratis</span>
            </div>
            
            <hr className="my-3" />
            
            <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold fs-5">Total</span>
                <span className="fw-bold fs-4 text-primary">$4,900.00</span>
            </div>
        </div>
    );
}
