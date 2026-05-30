import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';

export default function NotFound() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            
            <main className="container d-flex flex-column align-items-center justify-content-center text-center my-auto py-5">
                <h1 className="fw-bolder" style={{ fontSize: '10rem', color: '#f1f1f1', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>404</h1>
                <h2 className="fw-bold mb-3" style={{ marginTop: '-40px' }}>Página no encontrada</h2>
                <p className="text-muted mb-4 fs-5" style={{ maxWidth: '500px' }}>
                    Lo sentimos, la fragancia o la página que estás buscando se ha evaporado. 
                    Puede que haya sido eliminada o la URL no sea correcta.
                </p>
                <a href="/" className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm" style={{ letterSpacing: '1px' }}>
                    VOLVER A LA TIENDA
                </a>
            </main>

            <Footer />
        </div>
    );
}
