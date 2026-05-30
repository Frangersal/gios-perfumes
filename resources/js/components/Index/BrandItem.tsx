import React from 'react';

export interface Brand {
    id: number;
    name: string;
    logo: string;
    description: string;
}

interface BrandItemProps {
    brand: Brand;
    baseUrl?: string;
}

const normalizeImageUrl = (logo: string, baseUrl: string): string => {
    if (!logo) return '';
    if (logo.startsWith('blob:') || logo.startsWith('data:') || /^https?:\/\//i.test(logo)) {
        return logo;
    }
    const base = baseUrl.replace(/\/$/, '');
    const path = logo.startsWith('/') ? logo : `/${logo}`;
    return `${base}${path}`;
};

export default function BrandItem({ brand, baseUrl = '' }: BrandItemProps) {
    const logoUrl = normalizeImageUrl(brand.logo, baseUrl);
    const initials = brand.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div
                    className="rounded-circle d-flex align-items-center justify-content-center mb-3 overflow-hidden bg-light"
                    style={{ width: '100px', height: '100px' }}
                >
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt={brand.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '6px' }}
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                                (e.currentTarget.nextSibling as HTMLElement | null)?.style?.removeProperty('display');
                            }}
                        />
                    ) : null}
                    <span
                        className="fw-bold text-secondary fs-4"
                        style={{ display: logoUrl ? 'none' : 'block' }}
                    >
                        {initials}
                    </span>
                </div>
                <h5 className="card-title fw-bold">{brand.name}</h5>
                {/* <p className="card-text text-muted small">{brand.description}</p> */}
            </div>
        </div>
    );
}
