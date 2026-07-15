import React from 'react';
import '../../../css/layouts/header.css';

interface Promo {
    tag: string;
    text: string;
}

const promos: Promo[] = [
    { tag: 'Envío gratis',    text: 'En compras superiores a $1,500 MXN' },
    { tag: 'Hasta 30 % off',  text: 'En fragancias femeninas seleccionadas' },
    { tag: 'Regalo especial', text: 'Al adquirir dos fragancias o más' },
    { tag: 'Edición limitada', text: 'Descubre las novedades de temporada' },
];

export default function PromoBar() {
    const Group = (key: string) => (
        <div className="gp-promo__group" key={key}>
            {promos.map((p, idx) => (
                <React.Fragment key={`${key}-${idx}`}>
                    <span className="gp-promo__item">
                        <strong>{p.tag}</strong>
                        <span>· {p.text}</span>
                    </span>
                    <span className="gp-promo__sep" aria-hidden="true">◆ ◆ ◆</span>
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div className="gp-promo" role="region" aria-label="Promociones">
            <div className="gp-promo__track">
                {Group('a')}
                {Group('b')}
            </div>
        </div>
    );
}
