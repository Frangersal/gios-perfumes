import React from 'react';
import BrandItem, { Brand } from '../components/BrandItem';

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
    const infiniteBrands = [...BRANDS_DATA, ...BRANDS_DATA];

    return (
        <section className="my-5 overflow-hidden">
            <h3 className="text-center mb-4 text-uppercase fw-bold">Marcas Exclusivas</h3>
            
            <div className="brand-carousel-container">
                <div className="brand-carousel-track d-flex gap-4 py-3">
                    {infiniteBrands.map((brand, index) => (
                        <div key={`${brand.id}-${index}`} style={{ minWidth: '260px' }}>
                            <BrandItem brand={brand} />
                        </div>
                    ))}
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

                @keyframes scroll-brands {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        /* Desplazamos exactamente la mitad (una lista de marcas completa) */
                        transform: translateX(calc(-50% - 1rem)); 
                    }
                }
                `}
            </style>
        </section>
    );
}
