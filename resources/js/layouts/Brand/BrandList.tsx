import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrandCard from '../../components/Brand/BrandCard';

interface BrandItem {
    id: number;
    name: string;
    logo?: string | null;
    description?: string | null;
    country_of_origin?: string | null;
}

const slugify = (value: string): string =>
    value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

export default function BrandList() {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');
    const [brands, setBrands] = useState<BrandItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await axios.get<BrandItem[]>(`${baseUrl}/marcas`, {
                    headers: { Accept: 'application/json' },
                });
                if (!cancelled) {
                    setBrands(Array.isArray(res.data) ? res.data : []);
                }
            } catch (err) {
                console.error('Error cargando marcas', err);
                if (!cancelled) setBrands([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => {
            cancelled = true;
        };
    }, [baseUrl]);

    return (
        <section className="gp-brands-section">
            <div className="gp-brands-toolbar">
                <span className="gp-brands-toolbar__count">
                    {loading
                        ? 'Cargando casas perfumeras…'
                        : `${brands.length} ${brands.length === 1 ? 'casa perfumera' : 'casas perfumeras'}`}
                </span>
                <span className="gp-brands-toolbar__hint">Selección curada</span>
            </div>

            {loading ? (
                <div className="gp-brands-empty">Cargando piezas exclusivas…</div>
            ) : brands.length === 0 ? (
                <div className="gp-brands-empty">Aún no hay marcas para mostrar.</div>
            ) : (
                <div className="gp-brands-grid">
                    {brands.map((brand) => (
                        <BrandCard
                            key={brand.id}
                            id={brand.id}
                            name={brand.name}
                            slug={slugify(brand.name)}
                            description={brand.description}
                            country={brand.country_of_origin}
                            logo={brand.logo}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
