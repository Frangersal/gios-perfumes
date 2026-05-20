import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container">
                <a className="navbar-brand" href="/">Gio's Perfumes</a>
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
                        {/*
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Catálogo</a>
                        </li>
                        */}
                        <li className="nav-item">
                            <a className="nav-link" href="#">Hombre</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Mujer</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Marcas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Novedades</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ofertas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contacto</a>
                        </li>
                    </ul>
                    <div className="d-flex gap-2 align-items-center">
                        <button className="btn btn-outline-light">
                            Usuario
                        </button>
                        <button className="btn btn-light">
                            Carrito
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
