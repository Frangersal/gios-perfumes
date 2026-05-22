import React from 'react';

export default function WishlistEmpty() {
    return (
        <div className="text-center py-5 my-5">
            <div className="mb-4 text-muted" style={{ fontSize: '4rem' }}>🤍</div>
            <h2 className="fw-bold mb-3">Tu Wishlist está vacía</h2>
            <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '500px' }}>
                Parece que aún no tienes ningún producto guardado en tus favoritos. Explora nuestro catálogo y empieza a coleccionar los perfumes que más te gusten.
            </p>
            <a href="/shop" className="btn btn-dark px-4 py-2 text-uppercase fw-bold">Descubrir perfumes</a>
        </div>
    );
}