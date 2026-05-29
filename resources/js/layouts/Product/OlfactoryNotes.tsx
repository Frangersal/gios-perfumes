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
        <div className="mt-5 pt-3">
            <h4 className="mb-4">Notas Olfativas</h4>
            <div className="row g-3">
                {salida && (
                    <div className="col-12 col-md-4">
                        <NoteBadge title="Notas de Salida" notes={salida} />
                    </div>
                )}
                {corazon && (
                    <div className="col-12 col-md-4">
                        <NoteBadge title="Notas de Corazón" notes={corazon} />
                    </div>
                )}
                {fondo && (
                    <div className="col-12 col-md-4">
                        <NoteBadge title="Notas de Fondo" notes={fondo} />
                    </div>
                )}
            </div>
        </div>
    );
}
