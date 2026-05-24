import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminCustomers() {
    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Directorio de Clientes</h2>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Nombre</th>
                                    <th>Email</th>
                                    <th>Total Pedidos</th>
                                    <th>Total Gastado</th>
                                    <th>Fecha Registro</th>
                                    <th className="pe-4 text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ps-4 fw-bold">Carlos Sánchez</td>
                                    <td>carlos@example.com</td>
                                    <td>5</td>
                                    <td>$580.00</td>
                                    <td>10 Ene 2026</td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-dark">Ver Perfil</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-4 fw-bold">María López</td>
                                    <td>maria@example.com</td>
                                    <td>1</td>
                                    <td>$120.00</td>
                                    <td>20 May 2026</td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-dark">Ver Perfil</button>
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
