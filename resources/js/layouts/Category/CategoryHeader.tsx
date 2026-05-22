import React from 'react';

export default function CategoryHeader() {
    return (
        <div className="bg-dark text-white py-5 mb-5 text-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://placehold.co/1920x400/212529/495057?text=Categoria)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container py-4">
                <h1 className="display-4 fw-bold mb-3">Perfumes para Hombre</h1>
                <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
                    Descubre nuestra exclusiva selección de fragancias masculinas. Notas amaderadas, frescas y especiadas que definen tu carácter y elegancia en cada presentación.
                </p>
            </div>
        </div>
    );
}
