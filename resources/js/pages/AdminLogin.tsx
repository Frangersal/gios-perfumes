import React from 'react';

export default function AdminLogin() {
    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body p-4">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Gio's Admin</h2>
                        <p className="text-muted">Ingresa a tu panel de control</p>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" placeholder="admin@gios.com" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Contraseña</label>
                            <input type="password" className="form-control" placeholder="••••••••" />
                        </div>
                        <a href="/admin/dashboard" className="btn btn-dark w-100 py-2">
                            Iniciar Sesión
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}
