import React from 'react';

interface CategoryHeaderProps {
    /** Nombre tal cual viene de la BD (ej. "Hombre", "Mujer", "Árabes"). */
    categoryName?: string | null;
    /** Slug presente en la URL cuando aún no se resolvió la categoría. */
    slug?: string | null;
    /** Descripción opcional cargada desde la BD. */
    description?: string | null;
    /** Mientras se carga la información (placeholder neutro). */
    loading?: boolean;
}

const DEFAULTS = {
    eyebrow: 'Colección',
    title: (
        <>
            Nuestro <em>catálogo</em>
        </>
    ),
    description:
        'Explora nuestra selección de fragancias seleccionadas por nuestro equipo de expertos en perfumería.',
};

const PRESETS: Record<string, { eyebrow: string; title: React.ReactNode; description: string }> = {
    hombre: {
        eyebrow: 'Para él',
        title: (
            <>
                Perfumes para <em>Hombre</em>
            </>
        ),
        description:
            'Fragancias masculinas con notas amaderadas, frescas y especiadas que definen tu carácter y elegancia en cada presentación.',
    },
    mujer: {
        eyebrow: 'Para ella',
        title: (
            <>
                Perfumes para <em>Mujer</em>
            </>
        ),
        description:
            'Composiciones florales, frutales y orientales que envuelven cada gesto con elegancia y feminidad atemporal.',
    },
    unisex: {
        eyebrow: 'Sin género',
        title: (
            <>
                Fragancias <em>Unisex</em>
            </>
        ),
        description:
            'Perfumes que trascienden el género: notas equilibradas, contemporáneas y versátiles para cualquier ocasión.',
    },
    arabes: {
        eyebrow: 'Orient&aacute;l',
        title: (
            <>
                Fragancias <em>Árabes</em>
            </>
        ),
        description:
            'Composiciones intensas y exclusivas con oud, ámbar y especias que evocan los grandes palacios de Oriente.',
    },
    amaderados: {
        eyebrow: 'Familia olfativa',
        title: (
            <>
                Perfumes <em>Amaderados</em>
            </>
        ),
        description:
            'Fragancias con notas de madera profundas y elegantes: cedro, sándalo, vetiver y pachulí en estado puro.',
    },
};

const slugify = (value: string): string =>
    value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const titleCase = (value: string): string =>
    value
        .replace(/-+/g, ' ')
        .split(' ')
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(' ');

export default function CategoryHeader({
    categoryName,
    slug,
    description,
    loading = false,
}: CategoryHeaderProps) {
    // 1) Si hay nombre de BD, intentamos usar preset por su slug; si no existe, generamos uno genérico.
    if (categoryName) {
        const presetKey = slugify(categoryName);
        const preset = PRESETS[presetKey];
        if (preset) {
            return (
                <section className="gp-cat-hero">
                    <div className="gp-cat-hero__inner">
                        <span className="gp-eyebrow">{preset.eyebrow}</span>
                        <h1 className="gp-cat-hero__title">{preset.title}</h1>
                        <span className="gp-divider" />
                        <p className="gp-cat-hero__lead">{description?.trim() || preset.description}</p>
                    </div>
                </section>
            );
        }

        return (
            <section className="gp-cat-hero">
                <div className="gp-cat-hero__inner">
                    <span className="gp-eyebrow">Colección</span>
                    <h1 className="gp-cat-hero__title">
                        Perfumes <em>{categoryName}</em>
                    </h1>
                    <span className="gp-divider" />
                    <p className="gp-cat-hero__lead">
                        {description?.trim() ||
                            `Explora nuestra selección dentro de la categoría ${categoryName}.`}
                    </p>
                </div>
            </section>
        );
    }

    // 2) Aún cargando o sin categoría resuelta, pero con slug: mostramos un título derivado del slug.
    if (!loading && slug) {
        const preset = PRESETS[slug.toLowerCase()];
        if (preset) {
            return (
                <section className="gp-cat-hero">
                    <div className="gp-cat-hero__inner">
                        <span className="gp-eyebrow">{preset.eyebrow}</span>
                        <h1 className="gp-cat-hero__title">{preset.title}</h1>
                        <span className="gp-divider" />
                        <p className="gp-cat-hero__lead">{preset.description}</p>
                    </div>
                </section>
            );
        }

        const friendly = titleCase(slug);
        return (
            <section className="gp-cat-hero">
                <div className="gp-cat-hero__inner">
                    <span className="gp-eyebrow">Colección</span>
                    <h1 className="gp-cat-hero__title">
                        Perfumes <em>{friendly}</em>
                    </h1>
                    <span className="gp-divider" />
                    <p className="gp-cat-hero__lead">
                        Explora nuestra selección dentro de la categoría {friendly}.
                    </p>
                </div>
            </section>
        );
    }

    // 3) Fallback neutro (sin slug o cargando).
    return (
        <section className="gp-cat-hero">
            <div className="gp-cat-hero__inner">
                <span className="gp-eyebrow">{DEFAULTS.eyebrow}</span>
                <h1 className="gp-cat-hero__title">{DEFAULTS.title}</h1>
                <span className="gp-divider" />
                <p className="gp-cat-hero__lead">{DEFAULTS.description}</p>
            </div>
        </section>
    );
}
