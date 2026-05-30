import React, { useState } from 'react';
import axios from 'axios';

export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('login', credentials, {
                headers: { 'Accept': 'application/json' }
            });
            
            // Login de administrador exitoso, redirección
            window.location.href = 'dashboard';
            
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Credenciales inválidas');
            } else {
                setError('Error de servidor. Intenta nuevamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm" style={{ width: '400px' }}>
                <div className="card-body p-4">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">Gio's Admin</h2>
                        <p className="text-muted">Ingresa a tu panel de control</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger py-2">{error}</div>}

                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-control" 
                                placeholder="admin@gios.com" 
                                value={credentials.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Contraseña</label>
                            <input 
                                type="password" 
                                name="password"
                                className="form-control" 
                                placeholder="••••••••" 
                                value={credentials.password}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-dark w-100 py-2"
                            disabled={loading}
                        >
                            {loading ? 'Validando...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
