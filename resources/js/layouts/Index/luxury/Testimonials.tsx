import React from 'react';

interface Testimonial {
    body: string;
    name: string;
    role: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        body: 'La asesoría fue impecable. Me ayudaron a encontrar mi fragancia firma en una tarde. Llevo seis meses con ella y todavía me preguntan qué llevo.',
        name: 'Valeria M.',
        role: 'Ciudad de México',
        rating: 5,
    },
    {
        body: 'Empaque hermoso, envío rapidísimo y la muestra extra que llegó terminó convirtiéndose en mi siguiente compra. Servicio realmente de lujo.',
        name: 'Andrés R.',
        role: 'Monterrey',
        rating: 5,
    },
    {
        body: 'Producto original, factura impecable y precios mejores que en tiendas departamentales. Ya es mi único proveedor de perfumería.',
        name: 'Carolina P.',
        role: 'Guadalajara',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="gp-section">
            <div className="gp-section__head">
                <span className="gp-eyebrow">Lo que dicen nuestros clientes</span>
                <h2>Voces que <em>perduran</em></h2>
                <span className="gp-divider" />
            </div>

            <div className="gp-tests">
                {testimonials.map((t) => (
                    <article key={t.name} className="gp-test">
                        <div className="gp-test__stars" aria-label={`${t.rating} de 5 estrellas`}>
                            {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                        </div>
                        <p className="gp-test__body">“{t.body}”</p>
                        <div className="gp-test__author">
                            <div className="gp-test__avatar" aria-hidden="true">
                                {t.name.charAt(0)}
                            </div>
                            <div>
                                <strong>{t.name}</strong>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
