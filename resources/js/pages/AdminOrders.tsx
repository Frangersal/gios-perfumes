import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminOrders() {
    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Pedidos</h2>
                <div>
                    <button className="btn btn-outline-secondary me-2">Exportar</button>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Pedido ID</th>
                                    <th>Fecha</th>
                                    <th>Cliente</th>
                                    <th>Total</th>
                                    <th>Estado de Pago</th>
                                    <th>Estado de Envío</th>
                                    <th className="pe-4 text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ps-4 fw-bold">#PED-1024</td>
                                    <td>22 May 2026</td>
                                    <td>Juan Pérez</td>
                                    <td>$120.00</td>
                                    <td><span className="badge bg-success">Pagado</span></td>
                                    <td><span className="badge bg-warning text-dark">Procesando</span></td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-dark">Ver Detalle</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-4 fw-bold">#PED-1025</td>
                                    <td>21 May 2026</td>
                                    <td>Ana Gómez</td>
                                    <td>$245.00</td>
                                    <td><span className="badge bg-success">Pagado</span></td>
                                    <td><span className="badge bg-info">Enviado</span></td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-dark">Ver Detalle</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
