import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import LoginForm from '../layouts/Auth/LoginForm';

export default function Login() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            
            <main className="container d-flex align-items-center justify-content-center my-5">
                <div className="card shadow-sm border-0 w-100" style={{ maxWidth: '450px' }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Bienvenido de nuevo</h2>
                            <p className="text-muted">Ingresa tus datos para continuar</p>
                        </div>
                        
                        <LoginForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
