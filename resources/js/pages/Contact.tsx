import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';

import '../../css/pages/index.css';
import '../../css/pages/contact.css';

export default function Contact() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="grow gp-luxury">
                <section className="gp-contact-hero">
                    <div className="gp-contact-hero__inner">
                        <span className="gp-eyebrow">Atención personalizada</span>
                        <h1 className="gp-contact-hero__title">
                            Hablemos de <em>fragancias</em>
                        </h1>
                        <span className="gp-divider" />
                        <p className="gp-contact-hero__lead">
                            Nuestro equipo de atención al cliente está siempre disponible para responder
                            tus dudas sobre pedidos, fragancias o envíos.
                        </p>
                    </div>
                </section>

                <section className="gp-contact-layout">
                    {/* Información de contacto */}
                    <aside className="gp-contact-info">
                        <div className="gp-contact-info__head">
                            <span className="gp-eyebrow">¿Cómo podemos ayudarte?</span>
                            <h2 className="gp-contact-info__title">
                                Tu próxima <em>fragancia</em> empieza con una conversación
                            </h2>
                            <p className="gp-contact-info__lead">
                                Elige el canal que prefieras: respondemos en menos de 24 horas
                                con la misma dedicación con la que seleccionamos nuestras piezas.
                            </p>
                        </div>

                        <div className="gp-contact-info__list">
                            <div className="gp-contact-item">
                                <div className="gp-contact-item__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className="gp-contact-item__body">
                                    <strong>Visítanos</strong>
                                    <p>
                                        Av. de los Insurgentes Sur 123
                                        <br />
                                        Ciudad de México, CDMX 01234
                                    </p>
                                </div>
                            </div>

                            <div className="gp-contact-item">
                                <div className="gp-contact-item__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="gp-contact-item__body">
                                    <strong>Escríbenos</strong>
                                    <p>
                                        <a href="mailto:soporte@giosperfumes.com">soporte@giosperfumes.com</a>
                                    </p>
                                </div>
                            </div>

                            <div className="gp-contact-item">
                                <div className="gp-contact-item__icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                </div>
                                <div className="gp-contact-item__body">
                                    <strong>Llámanos</strong>
                                    <p>
                                        <a href="tel:+525512345678">+52 (55) 1234 5678</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Formulario */}
                    <div className="gp-contact-form">
                        <div className="gp-contact-form__head">
                            <span className="gp-eyebrow">Envíanos un mensaje</span>
                            <h3 className="gp-contact-form__title">
                                Cuéntanos qué <em>buscas</em>
                            </h3>
                            <span className="gp-contact-form__divider" />
                        </div>

                        <form>
                            <div className="gp-contact-form__grid">
                                <div className="gp-field">
                                    <label htmlFor="contactName" className="gp-field__label">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        className="gp-field__input"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>
                                <div className="gp-field">
                                    <label htmlFor="contactEmail" className="gp-field__label">
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        className="gp-field__input"
                                        placeholder="tu@correo.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="gp-field">
                                <label htmlFor="contactSubject" className="gp-field__label">
                                    Asunto
                                </label>
                                <input
                                    type="text"
                                    id="contactSubject"
                                    className="gp-field__input"
                                    placeholder="¿Sobre qué quieres hablar?"
                                    required
                                />
                            </div>

                            <div className="gp-field">
                                <label htmlFor="contactMessage" className="gp-field__label">
                                    Mensaje
                                </label>
                                <textarea
                                    id="contactMessage"
                                    className="gp-field__textarea"
                                    placeholder="Cuéntanos los detalles…"
                                    required
                                />
                            </div>

                            <button type="submit" className="gp-btn gp-btn-dark gp-contact-form__submit">
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
