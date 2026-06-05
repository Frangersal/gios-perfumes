import React, { useState } from 'react';

export default function NewsletterLuxury() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    };

    return (
        <section className="gp-news" aria-label="Suscríbete al newsletter">
            <div className="gp-news__inner">
                <span className="gp-eyebrow">Únete al círculo Gio's</span>
                <h3>
                    10% de descuento en<br />
                    tu <em>primera</em> compra.
                </h3>
                <p>
                    Suscríbete para recibir lanzamientos en exclusiva, ediciones limitadas
                    y consejos de nuestros expertos en perfumería directamente en tu bandeja.
                </p>

                {submitted ? (
                    <p style={{ color: 'var(--gp-gold)', fontWeight: 600, letterSpacing: '0.05em' }}>
                        ¡Gracias! Pronto recibirás tu código de bienvenida.
                    </p>
                ) : (
                    <form className="gp-news__form" onSubmit={handleSubmit}>
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

                <p className="gp-news__fine">
                    Al suscribirte aceptas nuestra política de privacidad. Puedes darte de baja cuando quieras.
                </p>
            </div>
        </section>
    );
}
