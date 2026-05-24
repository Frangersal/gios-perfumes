import React from 'react';
import BrandItem, { Brand } from '../../components/Index/BrandItem';

const BRANDS_DATA: Brand[] = [
    {
        id: 1,
        name: "Lumière Paris",
        logo: "LP",
        description: "Elegancia y sofisticación francesa."
    },
    {
        id: 2,
        name: "Aqua di Mare",
        logo: "AM",
        description: "Frescura marina interminable."
    },
    {
        id: 3,
        name: "Verso Italica",
        logo: "VI",
        description: "Glamour y estilo atrevido."
    },
    {
        id: 4,
        name: "Nuit Noire",
        logo: "NN",
        description: "Aromas intensos y misteriosos."
    },
    {
        id: 5,
        name: "Flora Botanica",
        logo: "FB",
        description: "Notas florales y naturaleza pura."
    },
    {
        id: 6,
        name: "Oud Royale",
        logo: "OR",
        description: "Lujo oriental inigualable."
    }
];

export default function BrandCarousel() {
    // Creamos un grupo de Marcas asegurando ser más ancho que la pantalla.
    const brandGroup = [...BRANDS_DATA, ...BRANDS_DATA];

    return (
        <section className="my-5 overflow-hidden">
            <h3 className="text-center mb-4 text-uppercase fw-bold">Marcas Exclusivas</h3>
            
            <div className="brand-carousel-container">
                <div className="brand-carousel-track py-3">
                    {/* Grupo 1 */}
                    <div className="brand-group">
                        {brandGroup.map((brand, index) => (
                            <div key={`g1-${brand.id}-${index}`} style={{ minWidth: '260px' }}>
                                <BrandItem brand={brand} />
                            </div>
                        ))}
                    </div>
                    {/* Grupo 2 (Copia idéntica para hacer el ciclo infinito sin saltos) */}
                    <div className="brand-group">
                        {brandGroup.map((brand, index) => (
                            <div key={`g2-${brand.id}-${index}`} style={{ minWidth: '260px' }}>
                                <BrandItem brand={brand} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>
                {`
                .brand-carousel-container {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }
                
                .brand-carousel-track {
                    display: flex;
                    width: max-content;
                    animation: scroll-brands 40s linear infinite;
                }

                .brand-carousel-track:hover {
                    animation-play-state: paused;
                }

                .brand-group {
                    display: flex;
                    gap: 1.5rem;   /* Bootstrap gap-4 = 1.5rem */
                    padding-right: 1.5rem; /* El mismo gap al final para el empalme perfecto */
                }

                @keyframes scroll-brands {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                `}
            </style>
        </section>
    );
}
