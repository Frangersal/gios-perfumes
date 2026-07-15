import React from 'react';

interface Cat {
    eyebrow: string;
    title: string;
    href: string;
    image: string;
}

const cats: Cat[] = [
    {
        eyebrow: 'Ella',
        title: 'Femenino',
        href: '/categoria/mujer',
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=80',
    },
    {
        eyebrow: 'Él',
        title: 'Masculino',
        href: '/categoria/hombre',
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80',
    },
    {
        eyebrow: 'Sin género',
        title: 'Unisex',
        href: '/categoria/unisex',
        image: 'https://images.unsplash.com/photo-1610461888750-10bfc601b874?auto=format&fit=crop&w=900&q=80',
    },
];

export default function FeaturedCategories() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    return (
        <section className="gp-section">
            <div className="gp-section__head">
                <span className="gp-eyebrow">Explora por universo</span>
                <h2>Una <em>fragancia</em> para cada historia</h2>
                <span className="gp-divider" />
                <p>
                    Cada colección revela una personalidad única.
                    Encuentra el perfume que cuenta tu historia y la convierte en estela.
                </p>
            </div>

            <div className="gp-cats">
                {cats.map((c) => (
                    <a key={c.title} href={`${baseUrl}${c.href}`} className="gp-cat">
                        <div className="gp-cat__img" style={{ backgroundImage: `url(${c.image})` }} aria-hidden="true" />
                        <div className="gp-cat__body">
                            <div className="gp-cat__eyebrow">{c.eyebrow}</div>
                            <h3 className="gp-cat__title">{c.title}</h3>
                            <span className="gp-cat__link">
                                Descubrir
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}
