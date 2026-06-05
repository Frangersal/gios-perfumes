import React from 'react';

export default function EditorialBanner() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    return (
        <section className="gp-section--cream">
            <div className="gp-editorial">
                <div className="gp-editorial__media" aria-hidden="true" />
                <div className="gp-editorial__body">
                    <span className="gp-eyebrow">Editorial</span>
                    <h3>
                        El <em>perfume</em> es la forma<br />
                        más intensa del recuerdo.
                    </h3>
                    <p>
                        Cada fragancia es una arquitectura invisible compuesta por decenas
                        de ingredientes. En Gio's seleccionamos casas perfumeras que
                        respetan el oficio: ingredientes nobles, fórmulas auténticas y
                        envases pensados para durar.
                    </p>
                    <blockquote className="gp-quote">
                        “Un perfume no se elige, te elige a ti.”
                    </blockquote>
                    <div>
                        <a href={`${baseUrl}/about`} className="gp-btn gp-btn-dark">
                            Conoce nuestra historia
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
