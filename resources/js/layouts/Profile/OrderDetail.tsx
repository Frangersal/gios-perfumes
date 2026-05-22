import React from 'react';

interface Props {
    orderId: string;
    onBack: () => void;
}

export default function OrderDetail({ orderId, onBack }: Props) {
    return (
        <div>
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-outline-dark btn-sm me-3 rounded-pill px-3" onClick={onBack}>&lt; Volver</button>
                <h3 className="fw-bold mb-0">Detalle del Pedido {orderId}</h3>
            </div>
            
            <p className="text-muted mb-4 fs-5">
                El pedido <strong className="text-dark">{orderId}</strong> se realizó el <strong className="text-dark">21 May, 2026</strong> y actualmente está <strong className="text-success">Entregado</strong>.
            </p>
            
            <h5 className="fw-bold mt-5 mb-3 border-bottom pb-2">Artículos del Pedido</h5>
            <div className="table-responsive mb-5">
                <table className="table border rounded-3 overflow-hidden">
                    <thead className="table-light">
                        <tr>
                            <th className="p-3">Producto</th>
                            <th className="p-3 text-end">Total</th>
                        </tr>
                    </thead>
                    <tbody className="border-top-0">
                        <tr>
                            <td className="p-3 text-muted">Aqua di Mare Essenza <strong className="text-dark">× 1</strong></td>
                            <td className="p-3 text-end fw-semibold">$4,900.00</td>
                        </tr>
                    </tbody>
                    <tfoot className="table-group-divider bg-light">
                        <tr>
                            <td className="p-3 fw-bold">Subtotal:</td>
                            <td className="p-3 text-end fw-bold">$4,900.00</td>
                        </tr>
                        <tr>
                            <td className="p-3 fw-bold">Envío:</td>
                            <td className="p-3 text-end fw-bold">$0.00</td>
                        </tr>
                        <tr className="fs-5">
                            <td className="p-3 fw-bold text-primary">Total:</td>
                            <td className="p-3 text-end fw-bold text-primary">$4,900.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Dirección de Facturación</h5>
                    <div className="card border-0 bg-light rounded-4 p-4 text-muted">
                        <p className="mb-0">
                            <strong className="text-dark fs-5 d-block mb-1">Juan Pérez</strong>
                            Calle Falsa 123<br/>
                            Colonia Centro<br/>
                            Ciudad, Estado 12345
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Dirección de Envío</h5>
                    <div className="card border-0 bg-light rounded-4 p-4 text-muted">
                        <p className="mb-0">
                            <strong className="text-dark fs-5 d-block mb-1">Juan Pérez</strong>
                            Calle Falsa 123<br/>
                            Colonia Centro<br/>
                            Ciudad, Estado 12345
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
