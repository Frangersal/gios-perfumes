import React from 'react';

export default function Carrusel() {
    return (
        <div id="carouselExampleIndicators" className="carousel slide mb-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://placehold.co/1200x400/f8f9fa/343a40?text=Descubre+Novedades" className="d-block w-100" alt="Slide 1" style={{ objectFit: 'cover', height: '400px' }} />
                </div>
                <div className="carousel-item">
                    <img src="https://placehold.co/1200x400/e9ecef/495057?text=Perfumes+Exclusivos" className="d-block w-100" alt="Slide 2" style={{ objectFit: 'cover', height: '400px' }} />
                </div>
                <div className="carousel-item">
                    <img src="https://placehold.co/1200x400/dee2e6/212529?text=Ofertas+Especiales" className="d-block w-100" alt="Slide 3" style={{ objectFit: 'cover', height: '400px' }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
}
