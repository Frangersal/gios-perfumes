import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Props {
    orderId: number;
    onBack: () => void;
}

interface OrderItem {
    id: number;
    product_id: number | null;
    product_name: string | null;
    brand: string | null;
    volume: string | null;
    quantity: number;
    price: number;
    total: number;
    image: string | null;
}

interface OrderDetailData {
    id: number;
    status: string;
    subtotal: number;
    shipping: number;
    total: number;
    payment_method: string | null;
    tracking_number: string | null;
    created_at: string | null;
    items: OrderItem[];
}

const formatCurrency = (value: number) =>
    Number(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleDateString('es-MX', {
            day: '2-digit',
            month: 'long',
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

export default function OrderDetail({ orderId, onBack }: Props) {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    const [order, setOrder] = useState<OrderDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        axios
            .get(`${baseUrl}/profile/orders/${orderId}`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (cancelled) return;
                if (res.data?.ok && res.data.order) {
                    setOrder(res.data.order as OrderDetailData);
                } else {
                    setError('No se pudo cargar el pedido.');
                }
            })
            .catch(() => {
                if (!cancelled) setError('No se pudo cargar el pedido.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [baseUrl, orderId]);

    return (
        <div>
            <div className="d-flex align-items-center mb-4">
                <button className="btn btn-outline-dark btn-sm me-3 rounded-pill px-3" onClick={onBack}>
                    &lt; Volver
                </button>
                <h3 className="fw-bold mb-0">Detalle del Pedido #{orderId}</h3>
            </div>

            {loading && (
                <div className="text-center py-5 text-muted">
                    <div className="spinner-border text-dark mb-3" role="status">
                        <span className="visually-hidden">Cargando…</span>
                    </div>
                    <div>Cargando detalle del pedido…</div>
                </div>
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && order && (
                <>
                    <p className="text-muted mb-4 fs-5">
                        El pedido <strong className="text-dark">#{order.id}</strong> se realizó el{' '}
                        <strong className="text-dark">{formatDate(order.created_at)}</strong> y actualmente está{' '}
                        <span className={`badge rounded-pill text-capitalize ${statusBadgeClass(order.status)}`}>
                            {order.status}
                        </span>
                        .
                    </p>

                    {order.tracking_number && (
                        <p className="text-muted mb-4">
                            Número de guía: <strong className="text-dark">{order.tracking_number}</strong>
                        </p>
                    )}

                    <h5 className="fw-bold mt-5 mb-3 border-bottom pb-2">Artículos del Pedido</h5>
                    <div className="table-responsive mb-5">
                        <table className="table border rounded-3 overflow-hidden">
                            <thead className="table-light">
                                <tr>
                                    <th className="p-3">Producto</th>
                                    <th className="p-3 text-center">Cantidad</th>
                                    <th className="p-3 text-end">Precio</th>
                                    <th className="p-3 text-end">Total</th>
                                </tr>
                            </thead>
                            <tbody className="border-top-0">
                                {order.items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="p-3">
                                            <div className="d-flex align-items-center gap-3">
                                                {item.image && (
                                                    <img
                                                        src={item.image}
                                                        alt={item.product_name ?? 'Producto'}
                                                        style={{ width: 56, height: 56, objectFit: 'cover' }}
                                                        className="rounded border"
                                                    />
                                                )}
                                                <div>
                                                    {item.brand && (
                                                        <div className="text-muted text-uppercase small fw-semibold">
                                                            {item.brand}
                                                        </div>
                                                    )}
                                                    <div className="fw-semibold text-dark">{item.product_name ?? '—'}</div>
                                                    {item.volume && (
                                                        <div className="small text-muted">{item.volume}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-3 text-center">{item.quantity}</td>
                                        <td className="p-3 text-end">{formatCurrency(item.price)}</td>
                                        <td className="p-3 text-end fw-semibold">{formatCurrency(item.total)}</td>
                                    </tr>
                                ))}
                                {order.items.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-muted">
                                            Este pedido no tiene artículos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot className="table-group-divider bg-light">
                                <tr>
                                    <td colSpan={3} className="p-3 fw-bold text-end">Subtotal</td>
                                    <td className="p-3 text-end fw-bold">{formatCurrency(order.subtotal)}</td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="p-3 fw-bold text-end">Envío</td>
                                    <td className="p-3 text-end fw-bold">{formatCurrency(order.shipping)}</td>
                                </tr>
                                <tr className="fs-5">
                                    <td colSpan={3} className="p-3 fw-bold text-end text-primary">Total</td>
                                    <td className="p-3 text-end fw-bold text-primary">{formatCurrency(order.total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-6">
                            <h5 className="fw-bold mb-3">Método de pago</h5>
                            <div className="card border-0 bg-light rounded-4 p-4 text-muted">
                                <p className="mb-0 text-capitalize">
                                    <strong className="text-dark fs-5 d-block mb-1">
                                        {order.payment_method ?? 'No especificado'}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h5 className="fw-bold mb-3">Resumen</h5>
                            <div className="card border-0 bg-light rounded-4 p-4 text-muted">
                                <div className="d-flex justify-content-between"><span>Pedido</span><strong className="text-dark">#{order.id}</strong></div>
                                <div className="d-flex justify-content-between"><span>Fecha</span><strong className="text-dark">{formatDate(order.created_at)}</strong></div>
                                <div className="d-flex justify-content-between"><span>Estado</span><strong className="text-dark text-capitalize">{order.status}</strong></div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
