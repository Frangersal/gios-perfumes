import React from 'react';

export default function Navbar() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <a className="navbar-brand" href={`${baseUrl}/`}>Gio's Perfumes</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/categoria/hombre`}>Hombre</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/categoria/mujer`}>Mujer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/marcas`}>Marcas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/shop?sort=newest`}>Novedades</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/shop?oferta=1`}>Ofertas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href={`${baseUrl}/contact`}>Contacto</a>
                        </li>
                    </ul>
                    <div className="d-flex gap-2 align-items-center">
                        <a className="btn btn-outline-light" href={`${baseUrl}/login`}>
                            Usuario
                        </a>
                        <a className="btn btn-light" href={`${baseUrl}/cart`}>
                            Carrito
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
