import React from 'react';
import NoteBadge from '../../components/Product/NoteBadge';

export default function OlfactoryNotes() {
    return (
        <div className="mt-5 pt-3">
            <h4 className="mb-4">Notas Olfativas</h4>
            <div className="row g-3">
                <div className="col-12 col-md-4">
                    <NoteBadge title="Notas de Salida" notes="Bergamota, Limón, Mandarina" />
                </div>
                <div className="col-12 col-md-4">
                    <NoteBadge title="Notas de Corazón" notes="Jazmín, Lirio de los valles" />
                </div>
                <div className="col-12 col-md-4">
                    <NoteBadge title="Notas de Fondo" notes="Almizcle, Ámbar, Cedro" />
                </div>
            </div>
        </div>
    );
}
