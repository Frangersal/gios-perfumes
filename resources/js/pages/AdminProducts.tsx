import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminProducts() {
    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Productos</h2>
                <a href="/admin/products/create" className="btn btn-dark">Nuevo Producto</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th className="pe-4 text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded me-3" style={{ width: '40px', height: '40px' }}></div>
                                            <div>
                                                <strong>Bleu de Chanel</strong><br/>
                                                <small className="text-muted">SKU: CH-001</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Hombre</td>
                                    <td>$120.00</td>
                                    <td>45</td>
                                    <td><span className="badge bg-success">Activo</span></td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-secondary me-2">Editar</button>
                                        <button className="btn btn-sm btn-outline-danger">Eliminar</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded me-3" style={{ width: '40px', height: '40px' }}></div>
                                            <div>
                                                <strong>Dior Sauvage</strong><br/>
                                                <small className="text-muted">SKU: DI-002</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Hombre</td>
                                    <td>$140.00</td>
                                    <td><span className="text-danger fw-bold">2</span></td>
                                    <td><span className="badge bg-success">Activo</span></td>
                                    <td className="pe-4 text-end">
                                        <button className="btn btn-sm btn-outline-secondary me-2">Editar</button>
                                        <button className="btn btn-sm btn-outline-danger">Eliminar</button>
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
