import React from 'react';

export default function CartItem() {
    return (
        <div className="card mb-3 border-0 shadow-sm">
            <div className="row g-0">
                <div className="col-md-3">
                    <img src="https://placehold.co/200x200/e9ecef/212529?text=Perfume" className="img-fluid rounded-start h-100 object-fit-cover" alt="Perfume" />
                </div>
                <div className="col-md-9">
                    <div className="card-body d-flex flex-column h-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 className="card-title fw-bold mb-1">Aqua di Mare Essenza</h5>
                                <p className="card-text text-muted small mb-0">Tamaño: 50ml</p>
                            </div>
                            <h5 className="fw-bold text-primary mb-0">$2,450.00</h5>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                            <div className="input-group" style={{ width: '120px' }}>
                                <button className="btn btn-outline-secondary btn-sm px-2" type="button">-</button>
                                <input type="text" className="form-control form-control-sm text-center font-weight-bold" defaultValue="1" readOnly />
                                <button className="btn btn-outline-secondary btn-sm px-2" type="button">+</button>
                            </div>
                            <button className="btn btn-link text-danger p-0 text-decoration-none small">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
