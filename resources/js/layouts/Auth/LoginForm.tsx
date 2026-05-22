import React from 'react';

export default function LoginForm() {
    return (
        <form>
            <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input type="email" className="form-control py-2" placeholder="ejemplo@correo.com" required />
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <label className="form-label fw-bold">Contraseña</label>
                    <a href="#" className="text-decoration-none small text-muted">¿Olvidaste tu contraseña?</a>
                </div>
                <input type="password" className="form-control py-2" placeholder="••••••••" required />
            </div>
            <button className="btn btn-dark w-100 py-3 fw-bold mb-3">Iniciar Sesión</button>
            <div className="text-center">
                <span className="text-muted">¿No tienes cuenta? </span>
                <a href="/register" className="text-decoration-none fw-bold text-dark">Regístrate aquí</a>
            </div>
        </form>
    );
}
