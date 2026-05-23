import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function Contact() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light bg-opacity-50">
            <Navbar />
            
            <div className="bg-dark text-white py-5 mb-5 text-center shadow-sm">
                <div className="container py-3">
                    <h1 className="fw-bold mb-0">Contacto</h1>
                </div>
            </div>

            <main className="container mb-5 pb-5">
                <div className="row g-5">
                    {/* Info Contacto */}
                    <div className="col-lg-5">
                        <h2 className="fw-bold mb-4">¿En qué podemos ayudarte?</h2>
                        <p className="text-muted fs-5 mb-5">
                            Nuestro equipo de atención al cliente está siempre disponible para responder tus dudas sobre pedidos, fragancias o envíos.
                        </p>

                        <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                            <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-geo-alt-fill fs-5"></i>
                            </div>
                            <div className="ms-4">
                                <h5 className="fw-bold mb-1">Visítanos</h5>
                                <p className="text-muted mb-0">Av. de los Insurgentes Sur 123<br/>Ciudad de México, CDMX 01234</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                            <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-envelope-fill fs-5"></i>
                            </div>
                            <div className="ms-4">
                                <h5 className="fw-bold mb-1">Escríbenos</h5>
                                <p className="text-muted mb-0">soporte@giosperfumes.com</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center">
                            <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-telephone-fill fs-5"></i>
                            </div>
                            <div className="ms-4">
                                <h5 className="fw-bold mb-1">Llámanos</h5>
                                <p className="text-muted mb-0">+52 (55) 1234 5678</p>
                            </div>
                        </div>
                    </div>

                    {/* Formulario */}
                    <div className="col-lg-7">
                        <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
                            <h4 className="fw-bold mb-4">Envíanos un mensaje</h4>
                            <form>
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6 form-floating">
                                        <input type="text" className="form-control bg-light border-0 rounded-3" id="contactName" placeholder="Nombre" required />
                                        <label htmlFor="contactName" className="ms-2">Nombre completo</label>
                                    </div>
                                    <div className="col-md-6 form-floating">
                                        <input type="email" className="form-control bg-light border-0 rounded-3" id="contactEmail" placeholder="Correo" required />
                                        <label htmlFor="contactEmail" className="ms-2">Correo electrónico</label>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control bg-light border-0 rounded-3" id="contactSubject" placeholder="Asunto" required />
                                    <label htmlFor="contactSubject">Asunto</label>
                                </div>
                                <div className="form-floating mb-4">
                                    <textarea className="form-control bg-light border-0 rounded-3" id="contactMessage" placeholder="Mensaje" style={{ height: '150px' }} required></textarea>
                                    <label htmlFor="contactMessage">Tu mensaje...</label>
                                </div>
                                <button className="btn btn-dark w-100 py-3 rounded-pill fw-bold" style={{ letterSpacing: '1px' }}>
                                    ENVIAR MENSAJE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
