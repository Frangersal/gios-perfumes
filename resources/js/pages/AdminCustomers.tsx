import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Customer = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    orders_count?: number;
    addresses_count?: number;
    total_spent?: number | string | null;
    created_at?: string;
};

export default function AdminCustomers() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/customers`, {
                    headers: { Accept: 'application/json' }
                });
                setCustomers(res.data || []);
            } catch (error) {
                console.error('Error cargando clientes', error);
            } finally {
                setLoading(false);
            }
        };

        loadCustomers();
    }, [baseUrl]);

    const openDeleteModal = (customer: Customer) => {
        setCustomerToDelete(customer);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setCustomerToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCustomerToDelete(null);
    };

    const confirmDelete = async () => {
        if (!customerToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/customers/${customerToDelete.id}`, {
                headers: { Accept: 'application/json' }
            });
            setCustomers(customers.filter((item) => item.id !== customerToDelete.id));
            forceCloseDeleteModal();
        } catch (error: any) {
            console.error('Error eliminando cliente', error);
            alert(error?.response?.data?.message || 'No se pudo eliminar el cliente.');
        } finally {
            setDeleting(false);
        }
    };

    const formatMoney = (value?: number | string | null) => {
        const parsed = typeof value === 'number' ? value : parseFloat(String(value || 0));
        if (Number.isNaN(parsed)) return '$0.00';
        return `$${parsed.toFixed(2)}`;
    };

    return (
        <AdminLayout>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/dashboard`} className="text-decoration-none text-muted">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Clientes</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Directorio de Clientes</h2>
                <a href={`${baseUrl}/admin/customers/create`} className="btn btn-dark">Nuevo Cliente</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando clientes...</div>
                    ) : customers.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay clientes registrados.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Cliente</th>
                                        <th>Email</th>
                                        <th>Teléfono</th>
                                        <th>Pedidos</th>
                                        <th>Total Gastado</th>
                                        <th>Registro</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td className="ps-4">
                                                <strong>{customer.name}</strong>
                                                <small className="text-muted d-block">ID: {customer.id}</small>
                                            </td>
                                            <td>{customer.email}</td>
                                            <td>{customer.phone || '-'}</td>
                                            <td>{customer.orders_count ?? 0}</td>
                                            <td>{formatMoney(customer.total_spent)}</td>
                                            <td>{customer.created_at ? new Date(customer.created_at).toLocaleDateString() : '-'}</td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/customers/${customer.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/admin/customers/${customer.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(customer)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title fw-bold">Eliminar cliente permanentemente</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        aria-label="Close"
                                        onClick={closeDeleteModal}
                                        disabled={deleting}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-warning d-flex align-items-start mb-3" role="alert">
                                        <span className="me-2 fw-bold">!</span>
                                        <div>
                                            Esta accion es irreversible y eliminara el cliente de forma permanente.
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted small">
                                        Si tiene pedidos asociados, la eliminación será bloqueada por seguridad.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" onClick={closeDeleteModal} disabled={deleting}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
                                        {deleting ? 'Eliminando...' : 'Eliminar definitivamente'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </AdminLayout>
    );
}
