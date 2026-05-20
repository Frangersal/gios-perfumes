import React from 'react';

export default function PromoBar() {
    return (
        <div style={{ backgroundColor: '#000', color: '#fff', padding: '6px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <style>
                {`
                @keyframes scroll-left {
                    0% { transform: translateX(100vw); }
                    100% { transform: translateX(-100%); }
                }
                .promo-scroll {
                    display: inline-block;
                    animation: scroll-left 40s linear infinite;
                    font-size: 0.85rem;
                    letter-spacing: 0.5px;
                }
                .promo-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>
            <div className="promo-scroll">
                <span className="mx-5">🚀 ENVÍO GRATIS EN COMPRAS MAYORES A $1500</span>
                <span className="mx-5">🌟 HASTA 30% DE DESCUENTO EN PERFUMES DE MUJER</span>
                <span className="mx-5">🎁 REGALO ESPECIAL EN LA COMPRA DE 2 FRAGANCIAS</span>
                <span className="mx-5">🔥 DESCUBRE NUESTRAS OFERTAS DE TEMPORADA</span>
            </div>
        </div>
    );
}
