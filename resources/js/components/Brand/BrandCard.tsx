import React from 'react';

interface BrandCardProps {
    id?: number | string;
    name: string;
    slug?: string;
    description?: string | null;
    country?: string | null;
    logo?: string | null;
}

const slugify = (value: string): string =>
    value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

const getInitials = (value: string): string => {
    const parts = value.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

const normalizeLogoUrl = (logo: string | null | undefined, baseUrl: string): string => {
    if (!logo) return '';
    if (logo.startsWith('blob:') || logo.startsWith('data:') || /^https?:\/\//i.test(logo)) return logo;
    const base = baseUrl.replace(/\/$/, '');
    // Acepta tanto "archivo.webp" como "/resources/img/brands/archivo.webp"
    if (logo.includes('/')) {
        return `${base}${logo.startsWith('/') ? '' : '/'}${logo}`;
    }
    return `${base}/resources/img/brands/${logo}`;
};

export default function BrandCard({
    name,
    slug,
    description,
    country,
    logo,
}: BrandCardProps) {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');
    const finalSlug = slug && slug.trim() !== '' ? slug : slugify(name);
    const href = `${baseUrl}/marcas/${finalSlug}`;
    const logoUrl = normalizeLogoUrl(logo, baseUrl);

    return (
        <a href={href} className="gp-brand-card">
            <div className="gp-brand-card__media">
                {logoUrl ? (
                    <img src={logoUrl} alt={name} loading="lazy" />
                ) : (
                    <span className="gp-brand-card__initial">{getInitials(name)}</span>
                )}
            </div>

            {country && <span className="gp-brand-card__country">{country}</span>}

            <h3 className="gp-brand-card__name">{name}</h3>
            <span className="gp-brand-card__divider" />

            {description && <p className="gp-brand-card__desc">{description}</p>}

            <span className="gp-brand-card__link">
                Descubrir
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="13 6 19 12 13 18" />
                </svg>
            </span>
        </a>
    );
}
