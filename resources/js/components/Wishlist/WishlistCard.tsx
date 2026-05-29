import React from 'react';

export default function WishlistCard() {
    return (
        <div className="card h-100 placeholder-glow position-relative shadow-sm border-0">
            {/* Botón de eliminar (corazón roto o X) */}
            <button 
                className="btn btn-light position-absolute rounded-circle shadow-sm d-flex align-items-center justify-content-center p-0" 
                title="Eliminar de favoritos"
                style={{ top: '10px', right: '10px', width: '35px', height: '35px', zIndex: 2 }}
            >
                <span className="text-danger fw-bold">&times;</span>
            </button>
            
            <img src="https://placehold.co/300x300/e9ecef/212529?text=Perfume+Favorito" className="card-img-top" alt="Perfume" />
            <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title fw-bold">Aqua di Mare Essenza</h5>
                <p className="card-text text-primary fw-bold mb-3">$2,450.00</p>
                <div className="mt-auto">
                    <button className="btn btn-primary w-100 text-uppercase fw-bold">Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
}
