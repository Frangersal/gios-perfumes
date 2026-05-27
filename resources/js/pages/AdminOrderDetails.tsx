import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type OrderDetails = {
    id?: number;
    user_id?: number;
    status?: string;
    subtotal?: number | string;
    shipping?: number | string;
    total?: number | string;
    payment_method?: string | null;
    tracking_number?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    user?: { id?: number; name?: string; email?: string } | null;
    coupons?: Array<{
        id?: number;
        code?: string;
        type?: string;
        value?: number | string;
        active?: boolean;
        start_date?: string | null;
        end_date?: string | null;
    }>;
    items?: Array<{
        id?: number;
        product_variant_id?: number;
        quantity?: number;
        price?: number | string;
        total?: number | string;
        product_variant?: {
            id?: number;
            product_id?: number;
            volume?: string;
            price?: number | string;
            stock?: number;
            product?: { id?: number; name?: string; sku?: string } | null;
        } | null;
    }>;
};

export default function AdminOrderDetails() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [order, setOrder] = useState<OrderDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/orders/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                setOrder(res.data);
            } catch (err) {
                console.error('Error cargando detalle del pedido', err);
                setError('No se pudo cargar el detalle del pedido.');
            } finally {
                setLoading(false);
            }
        };

        loadOrder();
    }, [baseUrl, resourceId]);

    const renderValue = (value: unknown) => {
        if (value === null || value === undefined || value === '') return '-';
        return String(value);
    };

    const formatMoney = (value?: number | string) => {
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
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/orders`} className="text-decoration-none text-muted">Pedidos</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Detalle</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Detalle del Pedido #{resourceId}</h2>
                    <p className="text-muted mb-0">Incluye cupón, items, variantes y totales.</p>
                </div>
                <div>
                    <a href={`${baseUrl}/admin/orders/${resourceId}/edit`} className="btn btn-outline-secondary me-2">Editar</a>
                    <a href={`${baseUrl}/admin/orders`} className="btn btn-dark">Volver al listado</a>
                </div>
            </div>

            {loading ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-center text-muted">Cargando detalle del pedido...</div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-4" style={{ width: '35%' }}>Campo</th>
                                            <th className="pe-4">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="ps-4 fw-semibold">ID</td><td className="pe-4">{renderValue(order?.id)}</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Cliente</td><td className="pe-4">{order?.user?.name || '-'} ({order?.user?.email || '-'})</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Estado</td><td className="pe-4">{renderValue(order?.status)}</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Método de pago</td><td className="pe-4">{renderValue(order?.payment_method)}</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Tracking</td><td className="pe-4">{renderValue(order?.tracking_number)}</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Creado en</td><td className="pe-4">{renderValue(order?.created_at)}</td></tr>
                                        <tr><td className="ps-4 fw-semibold">Actualizado en</td><td className="pe-4">{renderValue(order?.updated_at)}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <small className="text-muted d-block">Subtotal</small>
                                    <h4 className="mb-0">{formatMoney(order?.subtotal)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <small className="text-muted d-block">Envío</small>
                                    <h4 className="mb-0">{formatMoney(order?.shipping)}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100 border border-dark-subtle">
                                <div className="card-body">
                                    <small className="text-muted d-block">Total</small>
                                    <h4 className="mb-0">{formatMoney(order?.total)}</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Cupones aplicados</h5>
                                <small className="text-muted">Tabla order_coupons + coupons</small>
                            </div>
                            {(order?.coupons || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">Este pedido no tiene cupones aplicados.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Código</th>
                                                <th>Tipo</th>
                                                <th>Valor</th>
                                                <th>Activo</th>
                                                <th className="pe-4">Vigencia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(order?.coupons || []).map((coupon) => (
                                                <tr key={`coupon-${coupon.id}`}>
                                                    <td className="ps-4 fw-semibold">{coupon.code || '-'}</td>
                                                    <td>{coupon.type || '-'}</td>
                                                    <td>{renderValue(coupon.value)}</td>
                                                    <td>{coupon.active ? 'Sí' : 'No'}</td>
                                                    <td className="pe-4">{coupon.start_date || '-'} / {coupon.end_date || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Items del pedido</h5>
                                <small className="text-muted">Tablas order_items + product_variants</small>
                            </div>
                            {(order?.items || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">No hay items en este pedido.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Producto</th>
                                                <th>SKU</th>
                                                <th>Variante</th>
                                                <th>Cantidad</th>
                                                <th>Precio unit.</th>
                                                <th className="pe-4">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(order?.items || []).map((item) => (
                                                <tr key={`order-item-${item.id}`}>
                                                    <td className="ps-4">{item.product_variant?.product?.name || '-'}</td>
                                                    <td>{item.product_variant?.product?.sku || '-'}</td>
                                                    <td>{item.product_variant?.volume || '-'}</td>
                                                    <td>{renderValue(item.quantity)}</td>
                                                    <td>{formatMoney(item.price)}</td>
                                                    <td className="pe-4">{formatMoney(item.total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
