import React from 'react';

export default function Card() {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src="https://placehold.co/300x300/e9ecef/212529?text=Perfume" className="card-img-top" alt="Perfume" />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">Perfume Especial</h5>
                <p className="card-text">Una fragancia única con notas de salida frescas y un fondo amaderado.</p>
                <div className="mt-auto">
                    <button className="btn btn-primary w-100">Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
}