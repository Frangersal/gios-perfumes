import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';

interface NoteItem {
    id: number | string;
    name: string;
    slug: string;
    image?: string | null;
}

const NOTE_FAMILIES = [
    {
        slug: 'salida',
        title: 'Notas de Salida',
        subtitle: 'Los primeros 15 minutos',
        icon: '🌿',
        color: '#a8d5a2',
        description:
            'Son la primera impresión olfativa, las que percibes en cuanto rocías el perfume. Suelen ser frescas, ligeras y volátiles: cítricos como bergamota o limón, hierbas aromáticas y especias suaves. Se evaporan rápido pero marcan el carácter inicial de la fragancia.',
    },
    {
        slug: 'corazon',
        title: 'Notas de Corazón',
        subtitle: 'De 15 minutos a 4 horas',
        icon: '🌸',
        color: '#f1b9c8',
        description:
            'Aparecen cuando las notas de salida se atenúan y forman el alma del perfume. Aquí dominan flores como jazmín o rosa, frutas y especias más profundas. Son las responsables de la identidad principal de la fragancia y de cómo te acompañan durante el día.',
    },
    {
        slug: 'fondo',
        title: 'Notas de Fondo',
        subtitle: 'Hasta más de 8 horas',
        icon: '🪵',
        color: '#c9a98a',
        description:
            'Son la base sobre la que se construye la fragancia: maderas, ámbar, almizcle, vainilla, oud. Aparecen lentamente y dan profundidad, fijación y sensualidad. Es la estela que dejas y la que la gente recuerda de ti.',
    },
];

export default function Notes() {
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';

    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const normalizeImageUrl = (url?: string | null): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }
        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;
        return `${normalizedBase}${normalizedPath}`;
    };

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const res = await axios.get<NoteItem[]>(`${baseUrl}/notas`, {
                    headers: { Accept: 'application/json' },
                });
                setNotes(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error('Error cargando notas olfativas', error);
                setNotes([]);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, [baseUrl]);

    const filteredNotes = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return notes;
        return notes.filter((n) => n.name.toLowerCase().includes(term));
    }, [notes, search]);

    return (
        <div className="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            <SearchBar />
            <PromoBar />

            {/* Hero */}
            <div
                className="py-5 text-center text-white"
                style={{
                    background:
                        'linear-gradient(135deg, #1a1a1a 0%, #3a2a1f 60%, #5b3a26 100%)',
                }}
            >
                <div className="container py-4">
                    <span className="badge bg-light text-dark text-uppercase mb-3" style={{ letterSpacing: '2px' }}>
                        Pirámide olfativa
                    </span>
                    <h1 className="fw-bold display-4 mb-3">Las Notas de un Perfume</h1>
                    <p className="lead mx-auto" style={{ maxWidth: '720px', opacity: 0.9 }}>
                        Cada fragancia es una historia que se cuenta en tres capítulos. Descubre cómo las notas de salida,
                        corazón y fondo se entrelazan para crear el aroma que te define.
                    </p>
                </div>
            </div>

            <main className="container mb-5 pb-5">
                {/* Explicación de la pirámide */}
                <section className="py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">¿Qué son las notas olfativas?</h2>
                        <p className="text-muted mx-auto" style={{ maxWidth: '780px', lineHeight: '1.8' }}>
                            Un perfume no huele igual a los 5 minutos que a las 5 horas. Esto se debe a que está construido
                            por capas de ingredientes con distinta volatilidad, conocidas como <strong>pirámide olfativa</strong>.
                            Conocer estas tres familias te ayuda a entender por qué te gusta una fragancia y a elegir mejor la próxima.
                        </p>
                    </div>

                    <div className="row g-4">
                        {NOTE_FAMILIES.map((family) => (
                            <div key={family.slug} className="col-12 col-md-4">
                                <div
                                    className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                                    style={{ transition: 'transform .2s ease' }}
                                >
                                    <div
                                        className="py-4 text-center"
                                        style={{ backgroundColor: family.color }}
                                    >
                                        <div style={{ fontSize: '3rem', lineHeight: 1 }}>{family.icon}</div>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="text-uppercase text-muted small fw-semibold mb-1" style={{ letterSpacing: '1.5px' }}>
                                            {family.subtitle}
                                        </div>
                                        <h4 className="fw-bold mb-3">{family.title}</h4>
                                        <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                                            {family.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Grid de notas disponibles */}
                <section className="pt-5 border-top">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                        <div>
                            <h2 className="fw-bold mb-2">Nuestro catálogo de notas</h2>
                            <p className="text-muted mb-0">
                                Estas son las notas olfativas presentes en las fragancias de nuestra colección.
                            </p>
                        </div>
                        <div className="d-flex" style={{ minWidth: '260px' }}>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Buscar nota (ej. vainilla, oud...)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted py-5">Cargando notas...</div>
                    ) : filteredNotes.length === 0 ? (
                        <div className="text-center text-muted py-5">
                            No encontramos notas que coincidan con tu búsqueda.
                        </div>
                    ) : (
                        <div className="row g-4">
                            {filteredNotes.map((note) => {
                                const imgUrl = normalizeImageUrl(note.image);
                                return (
                                    <div key={String(note.id)} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-center">
                                            <div
                                                className="d-flex align-items-center justify-content-center bg-light"
                                                style={{ aspectRatio: '1 / 1' }}
                                            >
                                                {imgUrl ? (
                                                    <img
                                                        src={imgUrl}
                                                        alt={note.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: '2rem' }}>🌺</span>
                                                )}
                                            </div>
                                            <div className="card-body py-3 px-2">
                                                <div className="fw-semibold text-dark text-truncate" title={note.name}>
                                                    {note.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* CTA inferior */}
                <section className="text-center mt-5 pt-5">
                    <h3 className="fw-bold mb-3">¿Listo para encontrar tu fragancia ideal?</h3>
                    <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                        Ahora que conoces las notas olfativas, explora nuestra tienda y descubre qué perfume habla tu mismo idioma.
                    </p>
                    <a href={`${baseUrl}/shop`} className="btn btn-dark btn-lg px-5">
                        Ver toda la tienda
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
}
