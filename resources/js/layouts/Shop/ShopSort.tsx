import React from 'react';

export default function ShopSort() {
    return (
        <div className="d-flex align-items-center">
            <span className="me-2 text-muted">Ordenar por:</span>
            <select className="form-select w-auto" aria-label="Order by">
                <option value="populares">Más Populares</option>
                <option value="recientes">Más Recientes</option>
                <option value="precio_desc">Precio: Alto a Bajo</option>
                <option value="precio_asc">Precio: Bajo a Alto</option>
            </select>
        </div>
    );
}
