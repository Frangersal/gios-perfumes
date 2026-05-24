import React from 'react';

export default function AccountDetails() {
    return (
        <div>
            <h3 className="fw-bold mb-4">Detalles de Cuenta</h3>
            
            <form className="mt-4">
                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Nombre <span className="text-danger">*</span></label>
                        <input type="text" className="form-control rounded-3 py-2 bg-light" defaultValue="Juan" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-bold">Apellidos <span className="text-danger">*</span></label>
                        <input type="text" className="form-control rounded-3 py-2 bg-light" defaultValue="Pérez" required />
                    </div>
                </div>
                
                <div className="mb-4">
                    <label className="form-label fw-bold">Nombre visible <span className="text-danger">*</span></label>
                    <input type="text" className="form-control rounded-3 py-2 bg-light" defaultValue="JuanP" required />
                    <div className="form-text text-muted mt-2">Así será como tu nombre se mostrará en la sección de mi cuenta y en las reseñas de productos.</div>
                </div>

                <div className="mb-5">
                    <label className="form-label fw-bold">Correo Electrónico <span className="text-danger">*</span></label>
                    <input type="email" className="form-control rounded-3 py-2 bg-light" defaultValue="ejemplo@correo.com" required />
                </div>

                <button type="button" className="btn btn-dark py-3 px-5 rounded-pill fw-bold" style={{ letterSpacing: '0.5px' }}>
                    GUARDAR CAMBIOS
                </button>
            </form>
        </div>
    );
}
