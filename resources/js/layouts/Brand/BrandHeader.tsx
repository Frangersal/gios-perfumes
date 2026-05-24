import React from 'react';

export default function BrandHeader() {
    return (
        <div className="bg-light py-5 mb-5 border-bottom">
            <div className="container text-center">
                <div 
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 shadow-sm" 
                    style={{ width: '120px', height: '120px', fontSize: '2rem', fontWeight: 'bold', color: '#333' }}
                >
                    LP
                </div>
                <h1 className="fw-bold mb-3">Lumière Paris</h1>
                <p className="lead mx-auto text-muted" style={{ maxWidth: '700px' }}>
                    Nacida en el corazón de París en 1920, esta casa de perfumes es sinónimo de elegancia y sofisticación francesa. Famosa por sus delicadas notas florales y fondos amaderados que perduran en la memoria.
                </p>
            </div>
        </div>
    );
}
