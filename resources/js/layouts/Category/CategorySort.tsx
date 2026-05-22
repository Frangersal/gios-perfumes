import React from 'react';

export default function CategorySort() {
    return (
        <div className="d-flex align-items-center">
            <span className="me-2 text-muted fw-bold">Ordenar por:</span>
            <select className="form-select w-auto font-weight-bold" aria-label="Order category by">
                <option value="populares">Más Vendidos</option>
                <option value="recientes">Nuevos Ingresos</option>
                <option value="precio_desc">Mayor Precio</option>
                <option value="precio_asc">Menor Precio</option>
                <option value="recomendados">Recomendados</option>
            </select>
        </div>
    );
}