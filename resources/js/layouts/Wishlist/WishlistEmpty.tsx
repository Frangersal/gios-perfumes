import React from 'react';

export default function WishlistEmpty() {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    return (
        <div className="gp-wishlist-empty">
            <div className="gp-wishlist-empty__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </div>
            <span className="gp-eyebrow">Tu colección</span>
            <h2 className="gp-wishlist-empty__title">
                Aún no guardas <em>fragancias</em>
            </h2>
            <p className="gp-wishlist-empty__text">
                Explora nuestra selección de perfumes de autor y guarda los que despierten tu memoria olfativa para tenerlos siempre a la mano.
            </p>
            <a href={`${baseUrl}/shop`} className="gp-btn gp-btn-dark">
                Descubrir perfumes
            </a>
        </div>
    );
}