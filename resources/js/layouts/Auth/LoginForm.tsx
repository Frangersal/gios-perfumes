import React, { useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
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
            
            // Login exitoso, redirección
            window.location.href = 'profile';
            
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
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            
            <div className="mb-3">
                <label className="form-label fw-bold">Correo Electrónico</label>
                <input 
                    type="email" 
                    name="email"
                    className="form-control py-2" 
                    placeholder="ejemplo@correo.com" 
                    value={credentials.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="mb-4">
                <div className="d-flex justify-content-between">
                    <label className="form-label fw-bold">Contraseña</label>
                    <a href="#" className="text-decoration-none small text-muted">¿Olvidaste tu contraseña?</a>
                </div>
                <input 
                    type="password" 
                    name="password"
                    className="form-control py-2" 
                    placeholder="••••••••" 
                    value={credentials.password}
                    onChange={handleChange}
                    required 
                />
            </div>
            <button 
                type="submit" 
                className="btn btn-dark w-100 py-3 fw-bold mb-3"
                disabled={loading}
            >
                {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
            <div className="text-center">
                <span className="text-muted">¿No tienes cuenta? </span>
                <a href="/register" className="text-decoration-none fw-bold text-dark">Regístrate aquí</a>
            </div>
        </form>
    );
}
