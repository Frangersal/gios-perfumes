import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetail from './OrderDetail';

interface OrderRow {
    id: number;
    status: string;
    subtotal: number;
    shipping: number;
    total: number;
    payment_method: string | null;
    tracking_number: string | null;
    created_at: string | null;
    items_count: number;
}

const formatCurrency = (value: number) =>
    Number(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    } catch {
        return iso;
    }
};

const statusBadgeClass = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes('entreg')) return 'bg-success';
    if (s.includes('envia') || s.includes('tránsito') || s.includes('transito')) return 'bg-info text-dark';
    if (s.includes('cancel')) return 'bg-danger';
    if (s.includes('pag')) return 'bg-primary';
    return 'bg-warning text-dark';
};

export default function Orders() {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        axios
            .get(`${baseUrl}/profile/orders`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (cancelled) return;
                if (res.data?.ok) {
                    setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
                } else {
                    setError('No se pudieron cargar los pedidos.');
                }
            })
            .catch(() => {
                if (!cancelled) setError('No se pudieron cargar los pedidos.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [baseUrl]);

    if (selectedOrder !== null) {
        return <OrderDetail orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div>
            <h3 className="fw-bold mb-4">Historial de Compras</h3>

            {loading && (
                <div className="text-center py-5 text-muted">
                    <div className="spinner-border text-dark mb-3" role="status">
                        <span className="visually-hidden">Cargando…</span>
                    </div>
                    <div>Cargando tus pedidos…</div>
                </div>
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && orders.length === 0 && (
                <div className="text-center py-5">
                    <div className="display-1 mb-3 text-muted">🛍️</div>
                    <h4 className="fw-bold">Aún no tienes pedidos</h4>
                    <p className="text-muted mb-4">Cuando realices una compra, aparecerá aquí tu historial.</p>
                    <a href={`${baseUrl}/shop`} className="btn btn-dark px-4 py-2 fw-semibold">
                        Explorar perfumes
                    </a>
                </div>
            )}

            {!loading && !error && orders.length > 0 && (
                <div className="table-responsive rounded-3 border">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th scope="col" className="p-3">Pedido</th>
                                <th scope="col" className="p-3">Fecha</th>
                                <th scope="col" className="p-3">Estado</th>
                                <th scope="col" className="p-3">Total</th>
                                <th scope="col" className="p-3 text-end">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="border-top-0">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="fw-bold p-3">#{order.id}</td>
                                    <td className="p-3 text-muted">{formatDate(order.created_at)}</td>
                                    <td className="p-3">
                                        <span className={`badge rounded-pill text-capitalize ${statusBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {formatCurrency(order.total)}{' '}
                                        <span className="text-muted small">
                                            por {order.items_count} {order.items_count === 1 ? 'artículo' : 'artículos'}
                                        </span>
                                    </td>
                                    <td className="p-3 text-end">
                                        <button
                                            className="btn btn-sm btn-dark rounded-pill px-3 fw-semibold"
                                            onClick={() => setSelectedOrder(order.id)}
                                        >
                                            Ver Detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
