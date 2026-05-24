import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <h2 className="fw-bold mb-4">Dashboard Overview</h2>
            
            <div className="row g-4 mb-4">
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="text-muted mb-2">Ventas Totales</h6>
                        <h3 className="mb-0 fw-bold">$45,230.00</h3>
                        <small className="text-success">+12% este mes</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="text-muted mb-2">Pedidos Nuevos</h6>
                        <h3 className="mb-0 fw-bold">142</h3>
                        <small className="text-success">+5% este mes</small>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="text-muted mb-2">Usuarios Activos</h6>
                        <h3 className="mb-0 fw-bold">1,204</h3>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card border-0 shadow-sm p-3">
                        <h6 className="text-muted mb-2">Stock Bajo</h6>
                        <h3 className="mb-0 fw-bold text-danger">15</h3>
                        <small className="text-muted">Productos por revisar</small>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h5 className="fw-bold">Ingresos Recientes</h5>
                        </div>
                        <div className="card-body">
                            <div className="bg-light rounded" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="text-muted">[Gráfico de Ventas Aquí]</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h5 className="fw-bold">Últimos Pedidos</h5>
                        </div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>#PED-1023</strong><br />
                                        <small className="text-muted">Hace 10 min</small>
                                    </div>
                                    <span className="badge bg-warning text-dark">Pendiente</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>#PED-1022</strong><br />
                                        <small className="text-muted">Hace 45 min</small>
                                    </div>
                                    <span className="badge bg-success">Completado</span>
                                </li>
                                <li className="list-group-item px-0 d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>#PED-1021</strong><br />
                                        <small className="text-muted">Hace 2 horas</small>
                                    </div>
                                    <span className="badge bg-success">Completado</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
