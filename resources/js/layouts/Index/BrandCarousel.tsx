import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrandItem, { Brand } from '../../components/Index/BrandItem';

export default function BrandCarousel() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseUrl}/marcas`, { headers: { Accept: 'application/json' } })
            .then(res => {
                const data: Brand[] = (Array.isArray(res.data) ? res.data : res.data.brands ?? []).slice(0, 12);
                setBrands(data);
            })
            .catch(() => setBrands([]))
            .finally(() => setLoading(false));
    }, [baseUrl]);

    if (loading || brands.length === 0) {
        return null;
    }

    // Duplicamos para el ciclo infinito
    const brandGroup = [...brands, ...brands];

    return (
        <section className="my-5 overflow-hidden">
            <h3 className="text-center mb-4 text-uppercase">Marcas</h3>

            <div className="brand-carousel-container">
                <div className="brand-carousel-track py-3">
                    <div className="brand-group">
                        {brandGroup.map((brand, index) => (
                            <div key={`g1-${brand.id}-${index}`} style={{ minWidth: '260px' }}>
                                <BrandItem brand={brand} baseUrl={baseUrl} />
                            </div>
                        ))}
                    </div>
                    <div className="brand-group">
                        {brandGroup.map((brand, index) => (
                            <div key={`g2-${brand.id}-${index}`} style={{ minWidth: '260px' }}>
                                <BrandItem brand={brand} baseUrl={baseUrl} />
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
                    animation: scroll-brands 95s linear infinite;
                }

                .brand-carousel-track:hover {
                    animation-play-state: paused;
                }

                .brand-group {
                    display: flex;
                    gap: 1.5rem;
                    padding-right: 1.5rem;
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
