import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function About() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            
            {/* Cabecera / Banner */}
            <div className="bg-light py-5 mb-5 text-center">
                <div className="container py-4">
                    <h1 className="fw-bold display-4 mb-3">Sobre Nosotros</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Descubre la pasión y la historia detrás de cada frasco en Gio's Perfumes.
                    </p>
                </div>
            </div>

            <main className="container mb-5 pb-5">
                <div className="row align-items-center g-5 mb-5 pb-4 border-bottom">
                    <div className="col-lg-6">
                        <img 
                            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                            alt="Nuestra tienda" 
                            className="img-fluid rounded-4 shadow-lg" 
                        />
                    </div>
                    <div className="col-lg-6 px-lg-5">
                        <h2 className="fw-bold mb-4">Nuestra Historia</h2>
                        <p className="text-muted fs-5 mb-3" style={{ lineHeight: '1.8' }}>
                            Fundada con la visión de acercar las fragancias más prestigiosas del mundo, Gio's Perfumes nació de una profunda admiración por el arte de la perfumería. 
                        </p>
                        <p className="text-muted fs-5" style={{ lineHeight: '1.8' }}>
                            Creemos que el un buen perfume es la firma invisible más poderosa. Nuestro riguroso proceso de selección asegura que cada producto que llega a tus manos es 100% auténtico, garantizando una experiencia de compra inigualable y confidencial.
                        </p>
                    </div>
                </div>

                <div className="row g-5 text-center py-4">
                    <div className="col-md-4">
                        <div className="display-4 fw-bold text-dark mb-2">10+</div>
                        <h5 className="fw-bold">Años de Experiencia</h5>
                        <p className="text-muted">Acompañándote en tus mejores momentos.</p>
                    </div>
                    <div className="col-md-4">
                        <div className="display-4 fw-bold text-dark mb-2">100%</div>
                        <h5 className="fw-bold">Garantía de Autenticidad</h5>
                        <p className="text-muted">Solo productos originales de laboratorios oficiales.</p>
                    </div>
                    <div className="col-md-4">
                        <div className="display-4 fw-bold text-dark mb-2">24/7</div>
                        <h5 className="fw-bold">Atención Personalizada</h5>
                        <p className="text-muted">Asesoría olfativa cuando lo necesites.</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
