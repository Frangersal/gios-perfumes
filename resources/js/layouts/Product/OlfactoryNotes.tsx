import React from 'react';
import NoteBadge from '../../components/Product/NoteBadge';

interface ProductNote {
    id: number;
    note?: { name: string };
    note_type?: { name: string; slug?: string };
}

interface OlfactoryNotesProps {
    productNotes: ProductNote[];
}

export default function OlfactoryNotes({ productNotes }: OlfactoryNotesProps) {
    if (!productNotes || productNotes.length === 0) return null;

    const groupByType = (typeSlug: string) =>
        productNotes
            .filter((pn) => {
                const slug = pn.note_type?.slug ?? pn.note_type?.name?.toLowerCase();
                return slug?.includes(typeSlug);
            })
            .map((pn) => pn.note?.name)
            .filter(Boolean)
            .join(', ');

    const salida = groupByType('salida');
    const corazon = groupByType('corazon') || groupByType('corazón');
    const fondo = groupByType('fondo');

    if (!salida && !corazon && !fondo) return null;

    return (
        <div className="gp-onotes">
            <div className="gp-onotes__head">
                <span className="gp-eyebrow">Pirámide olfativa</span>
                <h3 className="gp-onotes__title">
                    Notas que <em>componen</em> la fragancia
                </h3>
            </div>

            <div className="gp-onotes__grid">
                {salida && <NoteBadge title="Notas de Salida" notes={salida} />}
                {corazon && <NoteBadge title="Notas de Corazón" notes={corazon} />}
                {fondo && <NoteBadge title="Notas de Fondo" notes={fondo} />}
            </div>
        </div>
    );
}
