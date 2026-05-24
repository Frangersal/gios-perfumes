import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';

export default function Search() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <Navbar />
            
            <main className="container my-5 pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                    <h2 className="fw-bold mb-0">Resultados para "Carolina Herrera"</h2>
                    <span className="text-muted">4 productos encontrados</span>
                </div>
                
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
                    {/* Producto 1 */}
                    <div className="col">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1594035910387-fea477242ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="card-img-top" alt="Perfume" style={{ objectFit: 'cover', height: '250px' }} />
                            <div className="card-body text-center p-4">
                                <h6 className="card-title fw-bold text-uppercase mb-1">Good Girl</h6>
                                <p className="text-muted small mb-2">Carolina Herrera</p>
                                <p className="fw-bold text-primary mb-0">$3,200.00 MXN</p>
                            </div>
                        </div>
                    </div>
                    {/* Producto 2 */}
                    <div className="col">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1594035910387-fea477242ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="card-img-top" alt="Perfume" style={{ objectFit: 'cover', height: '250px' }} />
                            <div className="card-body text-center p-4">
                                <h6 className="card-title fw-bold text-uppercase mb-1">Bad Boy</h6>
                                <p className="text-muted small mb-2">Carolina Herrera</p>
                                <p className="fw-bold text-primary mb-0">$2,900.00 MXN</p>
                            </div>
                        </div>
                    </div>
                    {/* Producto 3 */}
                    <div className="col">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1594035910387-fea477242ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="card-img-top" alt="Perfume" style={{ objectFit: 'cover', height: '250px' }} />
                            <div className="card-body text-center p-4">
                                <h6 className="card-title fw-bold text-uppercase mb-1">212 VIP</h6>
                                <p className="text-muted small mb-2">Carolina Herrera</p>
                                <p className="fw-bold text-primary mb-0">$2,650.00 MXN</p>
                            </div>
                        </div>
                    </div>
                    {/* Producto 4 */}
                    <div className="col">
                        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1594035910387-fea477242ba4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="card-img-top" alt="Perfume" style={{ objectFit: 'cover', height: '250px' }} />
                            <div className="card-body text-center p-4">
                                <h6 className="card-title fw-bold text-uppercase mb-1">CH Men</h6>
                                <p className="text-muted small mb-2">Carolina Herrera</p>
                                <p className="fw-bold text-primary mb-0">$2,450.00 MXN</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
