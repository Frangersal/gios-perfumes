import React from 'react';

export default function ReviewItem() {
    return (
        <div className="mb-4 pb-4 border-bottom">
            <div className="d-flex align-items-center mb-2">
                <div className="text-warning me-2">⭐⭐⭐⭐⭐</div>
                <strong className="me-2">María G.</strong>
                <span className="text-muted small">Hace 2 meses</span>
            </div>
            <p className="mb-0">¡Excelente perfume! El aroma dura todo el día y siempre recibo cumplidos cuando lo uso. Totalmente recomendado, sobre todo para eventos especiales.</p>
        </div>
    );
}
