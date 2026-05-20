import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function Test() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            
            <main className="container mt-5 flex-grow-1">
                <h1 className="text-primary">Hello world!</h1>
                <h2>Bienvenidos a Gio's Perfumes</h2>
                <div className="mt-4">
                    <button className="btn btn-primary me-2">Comprar Perfume</button>
                    <button className="btn btn-success">Ver Catálogo</button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
