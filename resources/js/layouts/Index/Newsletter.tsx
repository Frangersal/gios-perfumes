import React from 'react';

export default function Newsletter() {
    return (
        <section className="bg-light py-5 mt-5">
            <div className="container text-center">
                <h3 className="mb-3">Suscríbete a nuestro Newsletter</h3>
                <p className="text-muted mb-4">Recibe las últimas novedades, ofertas exclusivas y consejos directamente en tu correo.</p>
                <form className="d-flex justify-content-center mx-auto" style={{ maxWidth: '400px' }}>
                    <input 
                        type="email" 
                        className="form-control me-2" 
                        placeholder="Tu correo electrónico" 
                        required 
                    />
                    <button type="submit" className="btn btn-primary">
                        Suscribirme
                    </button>
                </form>
            </div>
        </section>
    );
}
