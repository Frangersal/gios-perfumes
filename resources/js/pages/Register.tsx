import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import RegisterForm from '../layouts/Auth/RegisterForm';

export default function Register() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            
            <main className="container flex-grow-1 d-flex align-items-center justify-content-center my-5">
                <div className="card shadow-sm border-0 w-100" style={{ maxWidth: '550px' }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Crear una cuenta</h2>
                            <p className="text-muted">Únete a nuestra comunidad exclusiva</p>
                        </div>
                        
                        <RegisterForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
