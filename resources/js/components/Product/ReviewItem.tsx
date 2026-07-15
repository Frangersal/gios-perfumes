import React from 'react';

export default function ReviewItem() {
    return (
        <article className="gp-review">
            <header className="gp-review__head">
                <span className="gp-review__stars" aria-hidden="true">★★★★★</span>
                <span className="gp-review__author">María G.</span>
                <span className="gp-review__date">Hace 2 meses</span>
            </header>
            <p className="gp-review__body">
                ¡Excelente perfume! El aroma dura todo el día y siempre recibo cumplidos cuando lo uso.
                Totalmente recomendado, sobre todo para eventos especiales.
            </p>
        </article>
    );
}
