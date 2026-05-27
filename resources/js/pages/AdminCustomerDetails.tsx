import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Address = {
    id: number;
    type?: string | null;
    country?: string | null;
    region?: string | null;
    city?: string | null;
    postal_code?: string | null;
    address?: string | null;
};

type Order = {
    id: number;
    status?: string | null;
    subtotal?: number | string | null;
    shipping?: number | string | null;
    total?: number | string | null;
    payment_method?: string | null;
    tracking_number?: string | null;
    created_at?: string;
};

type Customer = {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    created_at?: string;
    addresses?: Address[];
    orders?: Order[];
};

export default function AdminCustomerDetails() {
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';
    const resourceId = rootEl?.getAttribute('data-resource-id');

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!resourceId) return;

        const loadCustomer = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/customers/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                setCustomer(res.data);
            } catch (error) {
                console.error('Error cargando detalle de cliente', error);
            } finally {
                setLoading(false);
            }
        };

        loadCustomer();
    }, [baseUrl, resourceId]);

    const totalSpent = useMemo(() => {
        if (!customer?.orders?.length) return 0;
        return customer.orders.reduce((acc, order) => {
            const parsed = typeof order.total === 'number' ? order.total : parseFloat(String(order.total || 0));
            return acc + (Number.isNaN(parsed) ? 0 : parsed);
        }, 0);
    }, [customer]);

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
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/customers`} className="text-decoration-none text-muted">Clientes</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Detalle</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Detalle de Cliente</h2>
                <div className="d-flex gap-2">
                    {customer?.id && (
                        <a href={`${baseUrl}/admin/customers/${customer.id}/edit`} className="btn btn-outline-secondary">Editar</a>
                    )}
                    <a href={`${baseUrl}/admin/customers`} className="btn btn-dark">Volver</a>
                </div>
            </div>

            {loading ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-muted">Cargando cliente...</div>
                </div>
            ) : !customer ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-danger">No se encontro el cliente.</div>
                </div>
            ) : (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Nombre</h6>
                                    <p className="fw-semibold mb-0">{customer.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Email</h6>
                                    <p className="mb-0">{customer.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Telefono</h6>
                                    <p className="mb-0">{customer.phone || '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Pedidos</h6>
                                    <p className="mb-0 fw-semibold">{customer.orders?.length || 0}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Total Gastado</h6>
                                    <p className="mb-0 fw-semibold">{formatMoney(totalSpent)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body">
                                    <h6 className="text-muted mb-2">Fecha de registro</h6>
                                    <p className="mb-0">{customer.created_at ? new Date(customer.created_at).toLocaleString() : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white fw-semibold">Direcciones</div>
                        <div className="card-body p-0">
                            {!customer.addresses || customer.addresses.length === 0 ? (
                                <div className="p-4 text-muted">Este cliente no tiene direcciones registradas.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0 align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-3">Tipo</th>
                                                <th>Pais</th>
                                                <th>Region</th>
                                                <th>Ciudad</th>
                                                <th>Codigo Postal</th>
                                                <th className="pe-3">Direccion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.addresses.map((address) => (
                                                <tr key={address.id}>
                                                    <td className="ps-3">{address.type || '-'}</td>
                                                    <td>{address.country || '-'}</td>
                                                    <td>{address.region || '-'}</td>
                                                    <td>{address.city || '-'}</td>
                                                    <td>{address.postal_code || '-'}</td>
                                                    <td className="pe-3">{address.address || '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white fw-semibold">Pedidos</div>
                        <div className="card-body p-0">
                            {!customer.orders || customer.orders.length === 0 ? (
                                <div className="p-4 text-muted">Este cliente no tiene pedidos registrados.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0 align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-3">Pedido</th>
                                                <th>Estado</th>
                                                <th>Pago</th>
                                                <th>Tracking</th>
                                                <th>Total</th>
                                                <th className="pe-3">Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customer.orders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="ps-3">#{order.id}</td>
                                                    <td>
                                                        <span className="badge text-bg-secondary text-capitalize">{order.status || '-'}</span>
                                                    </td>
                                                    <td>{order.payment_method || '-'}</td>
                                                    <td>{order.tracking_number || '-'}</td>
                                                    <td>{formatMoney(order.total)}</td>
                                                    <td className="pe-3">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
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
