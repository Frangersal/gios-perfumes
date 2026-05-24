import React from 'react';

export interface Brand {
    id: number;
    name: string;
    logo: string;
    description: string;
}

interface BrandItemProps {
    brand: Brand;
}

export default function BrandItem({ brand }: BrandItemProps) {
    return (
        <div className="card text-center h-100 shadow-sm border-0">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                <div 
                    className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" 
                    style={{ width: '80px', height: '80px' }}
                >
                    <span className="fw-bold text-secondary fs-4">{brand.logo}</span>
                </div>
                <h5 className="card-title fw-bold">{brand.name}</h5>
                <p className="card-text text-muted small">{brand.description}</p>
            </div>
        </div>
    );
}
