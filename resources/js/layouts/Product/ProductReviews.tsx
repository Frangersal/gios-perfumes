import React from 'react';
import ReviewItem from '../../components/Product/ReviewItem';

interface ProductReviewsProps {
    reviews: any[];
}

export default function ProductReviews({ reviews }: ProductReviewsProps) {
    return (
        <section className="gp-reviews">
            <div className="gp-reviews__head">
                <span className="gp-eyebrow">Voces de la maison</span>
                <h2>
                    Reseñas de <em>nuestros clientes</em>
                </h2>
                <span className="gp-divider" />
            </div>

            <div className="gp-reviews__summary">
                <div className="gp-reviews__score">
                    4.8<em>/5</em>
                </div>
                <div>
                    <div className="gp-reviews__stars" aria-hidden="true">★★★★★</div>
                    <span className="gp-reviews__count">
                        Basado en 24 opiniones de compradores verificados
                    </span>
                </div>
            </div>

            <div className="gp-reviews__list">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </div>

            <div className="gp-reviews__more">
                <button type="button" className="gp-btn gp-btn-outline">
                    Cargar más reseñas
                </button>
            </div>
        </section>
    );
}
