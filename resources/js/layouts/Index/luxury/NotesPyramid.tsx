import React, { useState } from 'react';

type Layer = 'top' | 'heart' | 'base';

interface LayerData {
    label: string;
    eyebrow: string;
    title: React.ReactNode;
    duration: string;
    intensity: string;
    description: string;
    examples: string[];
}

const data: Record<Layer, LayerData> = {
    top: {
        label: 'Salida',
        eyebrow: 'Notas de salida · Top notes',
        title: <>La primera <em>impresión</em></>,
        duration: 'Primeros 15 minutos',
        intensity: 'Frescas y volátiles',
        description:
            'Las moléculas más ligeras y volátiles del perfume. Son las que percibes al rociar la fragancia y desaparecen rápidamente, dando paso al corazón. Su misión: seducir desde el primer instante.',
        examples: ['Bergamota', 'Limón', 'Mandarina', 'Pimienta rosa', 'Lavanda', 'Menta'],
    },
    heart: {
        label: 'Corazón',
        eyebrow: 'Notas de corazón · Heart notes',
        title: <>El <em>alma</em> del perfume</>,
        duration: 'Entre 2 y 4 horas',
        intensity: 'Carácter y personalidad',
        description:
            'El cuerpo principal de la fragancia, el más reconocible. Aparece cuando las notas de salida se desvanecen y define el estilo del perfume: floral, especiado, frutal o aromático.',
        examples: ['Rosa', 'Jazmín', 'Ylang-ylang', 'Iris', 'Canela', 'Cardamomo'],
    },
    base: {
        label: 'Fondo',
        eyebrow: 'Notas de fondo · Base notes',
        title: <>La <em>estela</em> que permanece</>,
        duration: 'Hasta 8 horas o más',
        intensity: 'Profundas y persistentes',
        description:
            'Las moléculas más pesadas, responsables de la fijación y la sensualidad. Se funden con la piel y forman el rastro inconfundible que recuerdan quienes te rodean.',
        examples: ['Sándalo', 'Ámbar', 'Almizcle', 'Vainilla', 'Pachulí', 'Oud'],
    },
};

/*
 *  Geometría de la pirámide (viewBox 0 0 200 200)
 *  Apex      : (100, 15)
 *  Base izq  : ( 15, 185)
 *  Base der  : (185, 185)
 *  Líneas horizontales que dividen las capas: y = 66 (top/heart) y y = 117 (heart/base)
 *
 *  Las medias-anchuras se calculan con la pendiente real de la pirámide,
 *  así las 3 capas encajan SIN espacios ni saltos.
 */
const SLICES: Record<Layer, { path: string; gradient: string; index: string; labelY: number; indexY: number; isDark?: boolean }> = {
    top: {
        path: 'M 100 15 L 125.5 66 L 74.5 66 Z',
        gradient: 'gp-grad-top',
        index: '01',
        labelY: 52,
        indexY: 42,
        isDark: true,
    },
    heart: {
        path: 'M 125.5 66 L 151 117 L 49 117 L 74.5 66 Z',
        gradient: 'gp-grad-heart',
        index: '02',
        labelY: 95,
        indexY: 85,
    },
    base: {
        path: 'M 151 117 L 185 185 L 15 185 L 49 117 Z',
        gradient: 'gp-grad-base',
        index: '03',
        labelY: 155,
        indexY: 145,
    },
};

const order: Layer[] = ['top', 'heart', 'base'];

export default function NotesPyramid() {
    const [active, setActive] = useState<Layer>('heart');
    const item = data[active];

    return (
        <section className="gp-section">
            <div className="gp-section__head">
                <span className="gp-eyebrow">Anatomía de una fragancia</span>
                <h2>La <em>pirámide</em> olfativa</h2>
                <span className="gp-divider" />
                <p>
                    Cada perfume se construye en tres niveles que se revelan con el tiempo
                    sobre tu piel. Explora cada capa para descubrir su papel.
                </p>
            </div>

            <div className="gp-notes">
                <div className="gp-pyramid" data-active={active}>
                    <svg
                        viewBox="0 0 200 200"
                        className="gp-pyramid__svg"
                        role="tablist"
                        aria-label="Capas olfativas"
                    >
                        <defs>
                            <linearGradient id="gp-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#d8b46a" />
                                <stop offset="100%" stopColor="#a98237" />
                            </linearGradient>
                            <linearGradient id="gp-grad-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#e6cba5" />
                                <stop offset="100%" stopColor="#c8a45c" />
                            </linearGradient>
                            <linearGradient id="gp-grad-base" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#efe0c4" />
                                <stop offset="100%" stopColor="#d6c19a" />
                            </linearGradient>
                        </defs>

                        {order.map((key) => {
                            const slice = SLICES[key];
                            const layer = data[key];
                            const isActive = active === key;
                            return (
                                <g
                                    key={key}
                                    role="tab"
                                    tabIndex={0}
                                    aria-selected={isActive}
                                    aria-controls={`gp-notes-panel-${key}`}
                                    id={`gp-notes-tab-${key}`}
                                    className={`gp-pyramid__slice${isActive ? ' is-active' : ''}`}
                                    onMouseEnter={() => setActive(key)}
                                    onFocus={() => setActive(key)}
                                    onClick={() => setActive(key)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setActive(key);
                                        }
                                    }}
                                >
                                    <path d={slice.path} fill={`url(#${slice.gradient})`} />
                                    <text
                                        x="100"
                                        y={slice.indexY}
                                        className={`gp-pyramid__index${slice.isDark ? ' gp-pyramid__index--top' : ''}`}
                                    >
                                        {slice.index}
                                    </text>
                                    <text
                                        x="100"
                                        y={slice.labelY}
                                        className={`gp-pyramid__label${slice.isDark ? ' gp-pyramid__label--top' : ''}`}
                                    >
                                        {layer.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Líneas-guía con duración (HTML, fuera del SVG) */}
                    <div className="gp-pyramid__guides" aria-hidden="true">
                        {order.map((key) => (
                            <span
                                key={key}
                                className={`gp-pyramid__guide gp-pyramid__guide--${key}${
                                    active === key ? ' is-active' : ''
                                }`}
                            >
                                {data[key].duration}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Panel lateral con detalle */}
                <div
                    className="gp-notes__panel"
                    role="tabpanel"
                    id={`gp-notes-panel-${active}`}
                    aria-labelledby={`gp-notes-tab-${active}`}
                >
                    <div className="gp-notes__panel-head gp-notes__panel-fade" key={`head-${active}`}>
                        <small>{item.eyebrow}</small>
                        <h4>{item.title}</h4>
                    </div>

                    <div className="gp-notes__panel-meta gp-notes__panel-fade" key={`meta-${active}`}>
                        <div>
                            <span>Duración</span>
                            <strong>{item.duration}</strong>
                        </div>
                        <div>
                            <span>Intensidad</span>
                            <strong>{item.intensity}</strong>
                        </div>
                    </div>

                    <div className="gp-notes__panel-body gp-notes__panel-fade" key={`body-${active}`}>
                        <p>{item.description}</p>
                    </div>

                    <div className="gp-notes__panel-examples gp-notes__panel-fade" key={`ex-${active}`}>
                        {item.examples.map((ex) => (
                            <span key={ex} className="gp-notes__chip">{ex}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
