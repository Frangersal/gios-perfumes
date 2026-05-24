import React from 'react';

export default function RegisterForm() {
    return (
        <form>
            <div className="row g-3 mb-3">
                <div className="col-sm-6">
                    <label className="form-label fw-bold">Nombre</label>
                    <input type="text" className="form-control py-2" required />
                </div>
                <div className="col-sm-6">
                    <label className="form-label fw-bold">Apellidos</label>
                    <input type="text" className="form-control py-2" required />
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input type="email" className="form-control py-2" placeholder="ejemplo@correo.com" required />
            </div>
            <div className="mb-4">
                <label className="form-label fw-bold">Contraseña</label>
                <input type="password" className="form-control py-2" placeholder="Crea una contraseña segura" required />
            </div>
            <div className="form-check mb-4">
                <input className="form-check-input" type="checkbox" id="terms" required />
                <label className="form-check-label text-muted small" htmlFor="terms">
                    Acepto los <a href="#" className="text-dark">términos y condiciones</a> y las políticas de privacidad.
                </label>
            </div>
            <button className="btn btn-dark w-100 py-3 fw-bold mb-3">Crear Cuenta</button>
            <div className="text-center">
                <span className="text-muted">¿Ya tienes cuenta? </span>
                <a href="/login" className="text-decoration-none fw-bold text-dark">Inicia sesión</a>
            </div>
        </form>
    );
}
