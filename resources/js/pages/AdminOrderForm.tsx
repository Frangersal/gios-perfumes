import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminOrderForm() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const isEdit = document.getElementById('root')?.getAttribute('data-page') === 'admin-order-edit';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        user_id: '',
        status: 'pendiente',
        subtotal: '0.00',
        shipping: '0.00',
        total: '0.00',
        payment_method: '',
        tracking_number: ''
    });

    useEffect(() => {
        const loadOrder = async () => {
            try {
                if (isEdit && resourceId) {
                    const res = await axios.get(`${baseUrl}/admin/orders/${resourceId}`, {
                        headers: { Accept: 'application/json' }
                    });

                    const order = res.data;
                    setFormData({
                        user_id: String(order.user_id || ''),
                        status: order.status || 'pendiente',
                        subtotal: String(order.subtotal ?? '0.00'),
                        shipping: String(order.shipping ?? '0.00'),
                        total: String(order.total ?? '0.00'),
                        payment_method: order.payment_method || '',
                        tracking_number: order.tracking_number || ''
                    });
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la información del pedido.');
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [baseUrl, isEdit, resourceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const payload: Record<string, string> = {
            status: formData.status,
            payment_method: formData.payment_method,
            tracking_number: formData.tracking_number,
            shipping: formData.shipping,
        };

        if (!isEdit) {
            payload.user_id = formData.user_id;
            payload.subtotal = formData.subtotal;
            payload.total = formData.total;
        }

        try {
            if (isEdit) {
                await axios.put(`${baseUrl}/admin/orders/${resourceId}`, payload, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/orders`, payload, {
                    headers: { Accept: 'application/json' }
                });
            }

            window.location.href = `${baseUrl}/admin/orders`;
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'No se pudo guardar el pedido.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-4 text-center text-muted">Cargando pedido...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/dashboard`} className="text-decoration-none text-muted">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/orders`} className="text-decoration-none text-muted">Pedidos</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar Pedido' : 'Crear Pedido'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Pedido' : 'Crear Pedido'}</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            {!isEdit && (
                                <>
                                    <div className="col-md-4">
                                        <label className="form-label">User ID</label>
                                        <input type="number" name="user_id" className="form-control" value={formData.user_id} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Subtotal</label>
                                        <input type="number" step="0.01" name="subtotal" className="form-control" value={formData.subtotal} onChange={handleChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Total</label>
                                        <input type="number" step="0.01" name="total" className="form-control" value={formData.total} onChange={handleChange} required />
                                    </div>
                                </>
                            )}

                            <div className="col-md-3">
                                <label className="form-label">Estado</label>
                                <select name="status" className="form-select" value={formData.status} onChange={handleChange} required>
                                    <option value="pendiente">Pendiente</option>
                                    <option value="procesando">Procesando</option>
                                    <option value="enviado">Enviado</option>
                                    <option value="entregado">Entregado</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Envío</label>
                                <input type="number" step="0.01" name="shipping" className="form-control" value={formData.shipping} onChange={handleChange} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Método de pago</label>
                                <input type="text" name="payment_method" className="form-control" value={formData.payment_method} onChange={handleChange} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Tracking</label>
                                <input type="text" name="tracking_number" className="form-control" value={formData.tracking_number} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-dark me-2" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Pedido'}
                            </button>
                            <a href={`${baseUrl}/admin/orders`} className="btn btn-outline-secondary">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
