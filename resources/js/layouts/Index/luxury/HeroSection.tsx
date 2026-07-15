import React from 'react';

export default function HeroSection() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    return (
        <section className="gp-hero">
            <div className="gp-hero__bg" aria-hidden="true" />

            <div className="gp-hero__inner">
                <div className="gp-hero__content">
                    <span className="gp-eyebrow gp-fade-in">Colección Otoño · Edición Limitada</span>

                    <h1 className="gp-hero__title gp-fade-in gp-delay-1">
                        El arte de <em>perfumar</em><br />
                        los momentos<br />
                        que importan.
                    </h1>

                    <p className="gp-hero__lead gp-fade-in gp-delay-2">
                        Descubre fragancias seleccionadas de las casas más prestigiosas del mundo.
                        Esencias auténticas, embotelladas para perdurar en la memoria.
                    </p>

                    <div className="gp-hero__cta gp-fade-in gp-delay-3">
                        <a href={`${baseUrl}/shop`} className="gp-btn gp-btn-gold">
                            Descubrir colección
                        </a>
                        <a href={`${baseUrl}/shop?sort=newest`} className="gp-btn gp-btn-ghost">
                            Ver novedades
                        </a>
                    </div>
                </div>
            </div>

            <div className="gp-hero__scroll" aria-hidden="true">
                <span>Scroll</span>
            </div>
        </section>
    );
}
