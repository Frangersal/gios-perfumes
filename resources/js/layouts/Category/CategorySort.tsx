import React from 'react';

export default function CategorySort() {
    return (
        <div className="gp-cat-sort">
            <span className="gp-cat-sort__label">Ordenar</span>
            <select className="gp-cat-sort__select" aria-label="Ordenar productos">
                <option value="populares">Más Vendidos</option>
                <option value="recientes">Nuevos Ingresos</option>
                <option value="precio_desc">Mayor Precio</option>
                <option value="precio_asc">Menor Precio</option>
                <option value="recomendados">Recomendados</option>
            </select>
        </div>
    );
}