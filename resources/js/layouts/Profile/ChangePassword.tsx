import React from 'react';

export default function ChangePassword() {
    return (
        <div>
            <h3 className="fw-bold mb-4">Cambiar Contraseña</h3>
            
            <form className="mt-4">
                <fieldset className="border border-opacity-50 p-4 p-md-5 rounded-4 bg-light mb-4">
                    <div className="mb-4">
                        <label className="form-label fw-bold text-dark">Contraseña actual</label>
                        <input type="password" className="form-control rounded-3 py-2" />
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold text-dark">Nueva contraseña</label>
                        <input type="password" className="form-control rounded-3 py-2" />
                    </div>
                    <div className="mb-0">
                        <label className="form-label fw-bold text-dark">Confirmar nueva contraseña</label>
                        <input type="password" className="form-control rounded-3 py-2" />
                    </div>
                </fieldset>

                <button type="button" className="btn btn-dark py-3 px-5 rounded-pill fw-bold mt-2" style={{ letterSpacing: '0.5px' }}>
                    ACTUALIZAR CONTRASEÑA
                </button>
            </form>
        </div>
    );
}
