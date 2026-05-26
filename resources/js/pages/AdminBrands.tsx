import React from 'react';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminBrands() {
    return (
        <AdminLayout>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Marcas</h2>
                <a href="/admin/brands/create" className="btn btn-dark">Nueva Marca</a>
            </div>

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <p className="text-muted">Próximamente: Listado y administración de marcas.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
