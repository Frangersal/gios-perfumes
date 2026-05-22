import React from 'react';
import ReviewItem from '../../components/Product/ReviewItem';

export default function ProductReviews() {
    return (
        <div className="mt-5 pt-5 border-top">
            <h3 className="mb-4">Reseñas de Clientes</h3>
            <div className="mb-5 d-flex align-items-center bg-light p-4 rounded">
                <div className="display-4 fw-bold me-4">4.8</div>
                <div>
                    <div className="text-warning fs-5">⭐⭐⭐⭐⭐</div>
                    <span className="text-muted">Basado en 24 opiniones de compradores verificados</span>
                </div>
            </div>
            
            <div className="reviews-list">
                <ReviewItem />
                <ReviewItem />
                <ReviewItem />
            </div>
            
            <div className="text-center mt-4">
                <button className="btn btn-outline-dark">Cargar más reseñas</button>
            </div>
        </div>
    );
}
