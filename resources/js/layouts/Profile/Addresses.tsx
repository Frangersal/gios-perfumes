import React from 'react';

export default function Addresses() {
    return (
        <div>
            <h3 className="fw-bold mb-4">Direcciones</h3>
            <p className="text-muted mb-4 fs-5">Las siguientes direcciones se utilizarán en la página de pago de forma predeterminada.</p>

            <div className="row g-4 mt-2">
                <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Dirección de Facturación</h5>
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body p-4 text-muted">
                            <address className="mb-4">
                                <strong className="text-dark fs-5 d-block mb-2">Juan Pérez</strong>
                                Calle Falsa 123<br/>
                                Colonia Centro<br/>
                                Ciudad, Estado 12345<br/>
                                México
                            </address>
                            <button className="btn btn-outline-dark btn-sm fw-bold rounded-pill px-3">Editar Dirección</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Dirección de Envío</h5>
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body p-4 text-muted">
                            <address className="mb-4">
                                <strong className="text-dark fs-5 d-block mb-2">Juan Pérez</strong>
                                Calle Falsa 123<br/>
                                Colonia Centro<br/>
                                Ciudad, Estado 12345<br/>
                                México
                            </address>
                            <button className="btn btn-outline-dark btn-sm fw-bold rounded-pill px-3">Editar Dirección</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
