import React, { useState } from 'react';
import '../../css/layouts/footer.css';

interface FooterLink {
    label: string;
    href: string;
}

interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export default function Footer() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubscribed(true);
    };

    const scrollTop = () =>
        window.scrollTo({ top: 0, behavior: 'smooth' });

    const columns: FooterColumn[] = [
        {
            title: 'Comprar',
            links: [
                { label: 'Mujer',          href: `${baseUrl}/categoria/mujer` },
                { label: 'Hombre',         href: `${baseUrl}/categoria/hombre` },
                { label: 'Unisex',         href: `${baseUrl}/categoria/unisex` },
                { label: 'Novedades',      href: `${baseUrl}/shop?sort=newest` },
                { label: 'Ofertas',        href: `${baseUrl}/shop?oferta=1` },
                { label: 'Marcas',         href: `${baseUrl}/marcas` },
            ],
        },
        {
            title: 'Cuenta',
            links: [
                { label: 'Iniciar sesión', href: `${baseUrl}/login` },
                { label: 'Crear cuenta',   href: `${baseUrl}/register` },
                { label: 'Mi perfil',      href: `${baseUrl}/profile` },
                { label: 'Mis pedidos',    href: `${baseUrl}/profile?tab=orders` },
                { label: 'Lista de deseos', href: `${baseUrl}/wishlist` },
                { label: 'Mi carrito',     href: `${baseUrl}/cart` },
            ],
        },
        {
            title: 'Ayuda',
            links: [
                { label: 'Centro de ayuda', href: `${baseUrl}/faq` },
                { label: 'Preguntas frecuentes', href: `${baseUrl}/faq` },
                { label: 'Envíos y entregas', href: `${baseUrl}/faq#envios` },
                { label: 'Cambios y devoluciones', href: `${baseUrl}/faq#devoluciones` },
                { label: 'Contacto',       href: `${baseUrl}/contact` },
                { label: 'Rastrear pedido', href: `${baseUrl}/profile?tab=orders` },
            ],
        },
        {
            title: 'Empresa',
            links: [
                { label: 'Sobre Gio\'s',   href: `${baseUrl}/about` },
                { label: 'Nuestras boutiques', href: `${baseUrl}/contact#boutiques` },
                { label: 'Sostenibilidad', href: `${baseUrl}/about#sostenibilidad` },
                { label: 'Programa de fidelidad', href: `${baseUrl}/about#fidelidad` },
                { label: 'Trabaja con nosotros', href: `${baseUrl}/contact#carreras` },
                { label: 'Prensa',         href: `${baseUrl}/contact#prensa` },
            ],
        },
    ];

    const Arrow = () => (
        <svg className="gp-footer__arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    );

    return (
        <footer className="gp-footer">
            {/* ─── Frase editorial ─── */}
            <div className="gp-footer__quote">
                <p>“Un perfume no se elige, te elige a ti.”</p>
                <span>— Maison Gio's</span>
            </div>

            {/* ─── 1. Newsletter band ─── */}
            <section className="gp-footer__band" aria-label="Newsletter">
                <div className="gp-footer__band-inner">
                    <div className="gp-footer__band-text">
                        <span className="gp-eyebrow">Únete al círculo Gio's</span>
                        <h3>
                            10 % de descuento en<br />
                            tu <em>primera</em> compra.
                        </h3>
                        <p>
                            Recibe lanzamientos en exclusiva, ediciones limitadas y
                            consejos de nuestros expertos en perfumería directamente
                            en tu bandeja de entrada.
                        </p>
                    </div>

                    <div>
                        {subscribed ? (
                            <div style={{ color: 'var(--gp-f-gold)', fontWeight: 600, letterSpacing: '0.05em', fontSize: '0.95rem' }}>
                                ¡Gracias! Pronto recibirás tu código de bienvenida.
                            </div>
                        ) : (
                            <form className="gp-footer__news-form" onSubmit={handleSubscribe}>
                                <input
                                    type="email"
                                    required
                                    placeholder="tu@correo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-label="Correo electrónico"
                                />
                                <button type="submit">Suscribirme</button>
                            </form>
                        )}
                        <p className="gp-footer__news-fine">
                            Al suscribirte aceptas nuestra política de privacidad. Puedes darte de baja cuando quieras.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 2. Main columns ─── */}
            <section className="gp-footer__main">
                <div className="gp-footer__main-inner">
                    {/* Marca + contacto + redes */}
                    <div className="gp-footer__col gp-footer__col--brand">
                        <a href={`${baseUrl}/`} className="gp-footer__logo">
                            Gio's <em>Perfumes</em>
                        </a>
                        <span className="gp-footer__tagline">Maison de Parfum · Desde 2024</span>

                        <p className="gp-footer__about">
                            Curaduría experta de las casas perfumeras más prestigiosas del mundo.
                            Fragancias 100 % originales, asesoría personalizada y envío cuidado a
                            todo México.
                        </p>

                        <ul className="gp-footer__contact">
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>Av. Insurgentes Sur 1234, Col. Del Valle<br />Ciudad de México, CDMX 03100</span>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a href="tel:+525555555555">+52 (55) 5555 5555</a>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <a href="mailto:hola@giosperfumes.mx">hola@giosperfumes.mx</a>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span>Lun–Sáb · 10:00 a 20:00 · Dom · 11:00 a 18:00</span>
                            </li>
                        </ul>

                        <div className="gp-footer__socials">
                            <a className="gp-footer__social" href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a className="gp-footer__social" href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a className="gp-footer__social" href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.5a8.16 8.16 0 0 0 4.77 1.52V6.58a4.79 4.79 0 0 1-1.84.11z" />
                                </svg>
                            </a>
                            <a className="gp-footer__social" href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="8" y1="12" x2="12" y2="22" />
                                    <path d="M12 12a4 4 0 1 0-4-4" />
                                </svg>
                            </a>
                            <a className="gp-footer__social" href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.35z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Columnas de links */}
                    {columns.map((col) => (
                        <div className="gp-footer__col" key={col.title}>
                            <h4>{col.title}</h4>
                            <ul>
                                {col.links.map((l) => (
                                    <li key={l.label}>
                                        <a href={l.href}>
                                            <Arrow />
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 3. Trust + payments ─── */}
            <section className="gp-footer__trust">
                <div className="gp-footer__trust-inner">
                    <div className="gp-footer__badges">
                        <span className="gp-footer__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <polyline points="9 12 11 14 15 10" />
                            </svg>
                            100 % originales
                        </span>
                        <span className="gp-footer__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Pago seguro SSL
                        </span>
                        <span className="gp-footer__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="1" y="3" width="15" height="13" />
                                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                <circle cx="5.5" cy="18.5" r="2.5" />
                                <circle cx="18.5" cy="18.5" r="2.5" />
                            </svg>
                            Envío a todo México
                        </span>
                        <span className="gp-footer__badge">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M3 12a9 9 0 1 0 9-9" />
                                <polyline points="3 4 3 12 11 12" />
                            </svg>
                            30 días para cambios
                        </span>
                    </div>

                    <div className="gp-footer__payments">
                        <span className="gp-footer__pay-label">Aceptamos</span>
                        <span className="gp-footer__pay" title="Visa">VISA</span>
                        <span className="gp-footer__pay" title="Mastercard">MC</span>
                        <span className="gp-footer__pay" title="American Express">AMEX</span>
                        <span className="gp-footer__pay" title="PayPal">PAYPAL</span>
                        <span className="gp-footer__pay" title="Mercado Pago">MP</span>
                        <span className="gp-footer__pay" title="OXXO">OXXO</span>
                        <span className="gp-footer__pay" title="SPEI">SPEI</span>
                    </div>
                </div>
            </section>

            {/* ─── 4. Bottom ─── */}
            <section className="gp-footer__bottom">
                <div className="gp-footer__bottom-inner">
                    <div className="gp-footer__copy">
                        © {new Date().getFullYear()} <em>Gio's Perfumes</em> — Todos los derechos reservados.
                    </div>

                    <nav className="gp-footer__legal" aria-label="Legal">
                        <a href={`${baseUrl}/terms`}>Términos y condiciones</a>
                        <a href={`${baseUrl}/privacy`}>Aviso de privacidad</a>
                        <a href={`${baseUrl}/privacy#cookies`}>Cookies</a>
                        <a href={`${baseUrl}/faq`}>Mapa del sitio</a>
                    </nav>

                    <span className="gp-footer__lang">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        México · MXN · Español
                    </span>
                </div>

                <button
                    type="button"
                    className="gp-footer__top"
                    aria-label="Volver arriba"
                    onClick={scrollTop}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                    </svg>
                </button>
            </section>
        </footer>
    );
}
