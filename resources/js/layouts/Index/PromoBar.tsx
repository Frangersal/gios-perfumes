import React from 'react';

export default function PromoBar() {
    return (
        <div style={{ backgroundColor: '#000', color: '#fff', padding: '10px 0', overflow: 'hidden' }}>
            <style>
                {`
                .promo-container {
                    display: flex;
                    width: max-content;
                    animation: scroll-promo 30s linear infinite;
                }
                .promo-container:hover {
                    animation-play-state: paused;
                }
                @keyframes scroll-promo {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .promo-group {
                    display: flex;
                }
                .promo-item {
                    margin: 0 3rem;
                    font-size: 0.85rem;
                    letter-spacing: 0.5px;
                    white-space: nowrap;
                }
                `}
            </style>
            <div className="promo-container">
                {/* Primer Grupo */}
                <div className="promo-group">
                    <span className="promo-item">🚀 ENVÍO GRATIS EN COMPRAS MAYORES A $1500</span>
                    <span className="promo-item">🌟 HASTA 30% DE DESCUENTO EN PERFUMES DE MUJER</span>
                    <span className="promo-item">🎁 REGALO ESPECIAL EN LA COMPRA DE 2 FRAGANCIAS</span>
                    <span className="promo-item">🔥 DESCUBRE NUESTRAS OFERTAS DE TEMPORADA</span>
                </div>
                {/* Segundo Grupo (Copia Exacta) */}
                <div className="promo-group">
                    <span className="promo-item">🚀 ENVÍO GRATIS EN COMPRAS MAYORES A $1500</span>
                    <span className="promo-item">🌟 HASTA 30% DE DESCUENTO EN PERFUMES DE MUJER</span>
                    <span className="promo-item">🎁 REGALO ESPECIAL EN LA COMPRA DE 2 FRAGANCIAS</span>
                    <span className="promo-item">🔥 DESCUBRE NUESTRAS OFERTAS DE TEMPORADA</span>
                </div>
            </div>
        </div>
    );
}
