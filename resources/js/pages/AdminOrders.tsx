import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Order = {
    id: number;
    status?: string;
    subtotal?: number | string;
    shipping?: number | string;
    total?: number | string;
    payment_method?: string | null;
    tracking_number?: string | null;
    created_at?: string;
    items_count?: number;
    user?: {
        id?: number;
        name?: string;
        email?: string;
    } | null;
    coupons?: Array<{
        id?: number;
        code?: string;
        type?: string;
        value?: number | string;
    }>;
};

export default function AdminOrders() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/orders`, {
                    headers: { Accept: 'application/json' }
                });
                setOrders(res.data || []);
            } catch (error) {
                console.error('Error cargando pedidos', error);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [baseUrl]);

    const openDeleteModal = (order: Order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };

    const confirmDelete = async () => {
        if (!orderToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/orders/${orderToDelete.id}`, {
                headers: { Accept: 'application/json' }
            });
            setOrders(orders.filter((item) => item.id !== orderToDelete.id));
            forceCloseDeleteModal();
        } catch (error: any) {
            console.error('Error eliminando pedido', error);
            alert(error?.response?.data?.message || 'No se pudo eliminar el pedido.');
        } finally {
            setDeleting(false);
        }
    };

    const formatMoney = (value?: number | string) => {
        const parsed = typeof value === 'number' ? value : parseFloat(String(value || 0));
        if (Number.isNaN(parsed)) return '$0.00';
        return `$${parsed.toFixed(2)}`;
    };

    const getStatusBadge = (status?: string) => {
        const normalized = String(status || '').toLowerCase();

        if (['pagado', 'completed', 'completado', 'entregado'].includes(normalized)) {
            return 'success';
        }

        if (['enviado', 'en tránsito', 'en transito', 'shipped'].includes(normalized)) {
            return 'info';
        }

        if (['cancelado', 'cancelled'].includes(normalized)) {
            return 'danger';
        }

        if (['pendiente', 'procesando', 'processing', 'pending'].includes(normalized)) {
            return 'warning text-dark';
        }

        return 'secondary';
    };

    return (
        <AdminLayout>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/dashboard`} className="text-decoration-none text-muted">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Pedidos</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Pedidos</h2>
                <a href={`${baseUrl}/admin/orders/create`} className="btn btn-outline-secondary">Nuevo pedido</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando pedidos...</div>
                    ) : orders.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay pedidos registrados.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Pedido</th>
                                        <th>Fecha</th>
                                        <th>Cliente</th>
                                        <th>Items</th>
                                        <th>Cupón</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="ps-4 fw-semibold">#{order.id}</td>
                                            <td>{order.created_at ? new Date(order.created_at).toLocaleString() : '-'}</td>
                                            <td>
                                                <strong>{order.user?.name || '-'}</strong>
                                                <small className="text-muted d-block">{order.user?.email || '-'}</small>
                                            </td>
                                            <td>{order.items_count ?? 0}</td>
                                            <td>
                                                {(order.coupons || []).length > 0
                                                    ? (order.coupons || []).map((coupon) => coupon.code).filter(Boolean).join(', ')
                                                    : '-'}
                                            </td>
                                            <td>{formatMoney(order.total)}</td>
                                            <td>
                                                <span className={`badge bg-${getStatusBadge(order.status)}`}>
                                                    {order.status || 'sin estado'}
                                                </span>
                                            </td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/orders/${order.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/admin/orders/${order.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(order)} className="btn btn-sm btn-outline-danger">Eliminar</button>
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
                                    <h5 className="modal-title fw-bold">Eliminar pedido permanentemente</h5>
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
                                            Esta accion es irreversible y eliminara el pedido de forma permanente.
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted small">
                                        Recomendación: para control operativo, suele ser mejor cambiar estado a cancelado en vez de eliminar.
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
