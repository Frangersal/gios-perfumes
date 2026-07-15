import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Brand {
    id: number;
    name: string;
    logo?: string;
}

const fallbackBrands: Brand[] = [
    { id: -1, name: 'Dior' },
    { id: -2, name: 'Chanel' },
    { id: -3, name: 'Tom Ford' },
    { id: -4, name: 'Armani' },
    { id: -5, name: 'Yves Saint Laurent' },
    { id: -6, name: 'Versace' },
    { id: -7, name: 'Givenchy' },
    { id: -8, name: 'Hermès' },
];

export default function BrandsMarquee() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) return url;
        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;
        return `${normalizedBase}${normalizedPath}`;
    };

    useEffect(() => {
        let cancelled = false;
        axios
            .get(`${baseUrl}/marcas`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (cancelled) return;
                const data: Brand[] = (Array.isArray(res.data) ? res.data : res.data?.brands ?? []).slice(0, 12);
                setBrands(data.length ? data : fallbackBrands);
            })
            .catch(() => !cancelled && setBrands(fallbackBrands))
            .finally(() => !cancelled && setLoading(false));
        return () => { cancelled = true; };
    }, [baseUrl]);

    if (loading) return null;

    const track = [...brands, ...brands];

    return (
        <section className="gp-marquee" aria-label="Marcas">
            <div className="gp-marquee__head">
                <span>Las casas perfumeras que confían en nosotros</span>
            </div>

            <div className="gp-marquee__track">
                {track.map((b, i) => {
                    const href = b.id > 0 ? `${baseUrl}/marcas/${b.id}` : '#';
                    const logo = normalizeImageUrl(b.logo);
                    return (
                        <a key={`${b.id}-${i}`} href={href} className="gp-marquee__item" title={b.name}>
                            {logo ? <img src={logo} alt={b.name} loading="lazy" /> : b.name}
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
