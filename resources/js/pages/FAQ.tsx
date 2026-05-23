import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function FAQ() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            
            <main className="container my-5 pb-5" style={{ maxWidth: '800px' }}>
                <h1 className="fw-bold text-center mb-3">Preguntas Frecuentes</h1>
                <p className="text-center text-muted mb-5 fs-5">Resuelve tus dudas rápidamente explorando nuestras preguntas más comunes.</p>

                {/* Importante: para que el Accordion de Bootstrap funcione sin inicializar JS manualmente, usamos data-bs en vez de state manejado, o si no hemos importado el JS de Bootstrap usaremos un diseño de cards clásico. Para evitar problemas de reactinidad, usamos una estructura sencilla abierta */}
                
                <div className="d-flex flex-column gap-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                <span className="bg-dark text-white rounded-circle d-inline-flex justify-content-center align-items-center me-3" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>1</span>
                                ¿Los perfumes son 100% originales?
                            </h5>
                            <p className="text-muted mb-0 ms-5 border-start border-2 ps-3">
                                Absolutamente. En Gio's Perfumes solo trabajamos con distribuidores autorizados y directos de las marcas. Todos nuestros productos vienen en su empaque original sellado de fábrica.
                            </p>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                <span className="bg-dark text-white rounded-circle d-inline-flex justify-content-center align-items-center me-3" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>2</span>
                                ¿Cuánto tardan los envíos?
                            </h5>
                            <p className="text-muted mb-0 ms-5 border-start border-2 ps-3">
                                Ofrecemos envío express que demora entre 1 y 2 días hábiles a ciudades principales, y envío estándar internacional que toma entre 3 y 5 días dependiendo de la zona postal.
                            </p>
                        </div>
                    </div>

                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                <span className="bg-dark text-white rounded-circle d-inline-flex justify-content-center align-items-center me-3" style={{ width: '30px', height: '30px', fontSize: '0.9rem' }}>3</span>
                                ¿Puedo devolver o cambiar un perfume?
                            </h5>
                            <p className="text-muted mb-0 ms-5 border-start border-2 ps-3">
                                Por razones de higiene y calidad garantizada, solo aceptamos cambios si el producto llega con algún defecto de fábrica y siempre y cuando su celofán o empaque primario permanezca intacto y sin abrir. Tienes 5 días naturales para reportarlo.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="text-center mt-5">
                    <p className="text-muted">¿No encuentras lo que buscas?</p>
                    <a href="/contact" className="btn btn-outline-dark rounded-pill px-4 fw-bold">Contáctanos</a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
