import React from 'react';

export default function BrandCard() {
    return (
        <a href="/marcas/lumiere-paris" className="text-decoration-none text-dark">
            <div className="card h-100 border-0 shadow-sm text-center brand-card transition duration-300">
                <style>
                    {`
                    .brand-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                    }
                    `}
                </style>
                <div className="card-body p-4 d-flex flex-column align-items-center justify-content-center">
                    <div 
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" 
                        style={{ width: '100px', height: '100px', fontSize: '1.5rem', fontWeight: 'bold', color: '#555' }}
                    >
                        LP
                    </div>
                    <h5 className="card-title fw-bold">Lumière Paris</h5>
                    <p className="card-text text-muted small mt-2">
                        Elegancia y sofisticación francesa para paladares exquisitos.
                    </p>
                </div>
            </div>
        </a>
    );
}
