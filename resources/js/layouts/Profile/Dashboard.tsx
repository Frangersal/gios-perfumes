import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface DashboardProps {
    setActiveTab: (tab: string) => void;
    userRole?: string;
    userName?: string;
}

interface OrderRow {
    id: number;
    status: string;
    total: number;
    created_at: string | null;
    items_count: number;
}

interface AddressRow {
    id: number;
    country: string;
    region: string;
    city: string;
    postal_code: string | null;
    address: string;
    type: string | null;
}

interface AccountInfo {
    name: string;
    email: string;
    phone: string | null;
}

const formatCurrency = (value: number) =>
    Number(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    try {
        return new Date(iso).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
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

export default function Dashboard({ setActiveTab, userRole, userName }: DashboardProps) {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    const [orders, setOrders] = useState<OrderRow[]>([]);
    const [addresses, setAddresses] = useState<AddressRow[]>([]);
    const [account, setAccount] = useState<AccountInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        Promise.allSettled([
            axios.get(`${baseUrl}/profile/orders`, { headers: { Accept: 'application/json' } }),
            axios.get(`${baseUrl}/profile/addresses`, { headers: { Accept: 'application/json' } }),
            axios.get(`${baseUrl}/profile/account`, { headers: { Accept: 'application/json' } }),
        ]).then((results) => {
            if (cancelled) return;
            const [ordersRes, addrRes, accRes] = results;
            if (ordersRes.status === 'fulfilled' && ordersRes.value.data?.ok) {
                setOrders(ordersRes.value.data.orders || []);
            }
            if (addrRes.status === 'fulfilled' && addrRes.value.data?.ok) {
                setAddresses(addrRes.value.data.addresses || []);
            }
            if (accRes.status === 'fulfilled' && accRes.value.data?.ok) {
                setAccount(accRes.value.data.user || null);
            }
            setLoading(false);
        });
        return () => {
            cancelled = true;
        };
    }, [baseUrl]);

    const totalSpent = orders.reduce((acc, o) => acc + Number(o.total || 0), 0);
    const lastOrder = orders[0] || null;
    const primaryAddress = addresses[0] || null;
    const displayName = account?.name || userName || 'Usuario';

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h3 className="fw-bold mb-0">Dashboard</h3>
                {userRole && (
                    <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                        Rol actual: {userRole}
                    </span>
                )}
            </div>

            <p className="fs-5 mb-1">
                Hola <span className="fw-bold text-dark">{displayName}</span>
            </p>
            <p className="text-muted mb-4">
                Desde aquí puedes ver el estado de tus pedidos, gestionar tus direcciones y actualizar los datos de tu cuenta.
            </p>

            {/* Resumen rápido */}
            <div className="row g-3 mb-4">
                <div className="col-sm-4">
                    <div className="card border-0 bg-dark text-white rounded-4 h-100">
                        <div className="card-body p-4">
                            <small className="text-uppercase fw-semibold opacity-75">Pedidos realizados</small>
                            <div className="fs-2 fw-bold mt-1">{loading ? '—' : orders.length}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card border-0 bg-light rounded-4 h-100">
                        <div className="card-body p-4">
                            <small className="text-uppercase fw-semibold text-muted">Total gastado</small>
                            <div className="fs-2 fw-bold mt-1">{loading ? '—' : formatCurrency(totalSpent)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card border-0 bg-light rounded-4 h-100">
                        <div className="card-body p-4">
                            <small className="text-uppercase fw-semibold text-muted">Direcciones</small>
                            <div className="fs-2 fw-bold mt-1">{loading ? '—' : `${addresses.length} / 2`}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tarjetas con preview de cada sección */}
            <div className="row g-4">
                {/* Mis Pedidos */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 rounded-4">
                        <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">Mis Pedidos</h5>
                                <span className="badge bg-secondary rounded-pill">{orders.length}</span>
                            </div>
                            {loading ? (
                                <p className="text-muted small mb-0">Cargando…</p>
                            ) : lastOrder ? (
                                <>
                                    <p className="small text-muted mb-2">Último pedido</p>
                                    <div className="mb-2">
                                        <div className="fw-semibold">#{lastOrder.id}</div>
                                        <div className="small text-muted">{formatDate(lastOrder.created_at)}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <span className={`badge rounded-pill text-capitalize ${statusBadgeClass(lastOrder.status)}`}>
                                            {lastOrder.status}
                                        </span>
                                        <span className="fw-bold">{formatCurrency(lastOrder.total)}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="text-muted small mb-3">Aún no has realizado pedidos.</p>
                            )}
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm rounded-pill mt-auto fw-semibold"
                                onClick={() => setActiveTab('orders')}
                            >
                                Ver historial
                            </button>
                        </div>
                    </div>
                </div>

                {/* Direcciones */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 rounded-4">
                        <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">Direcciones</h5>
                                <span className="badge bg-secondary rounded-pill">{addresses.length} / 2</span>
                            </div>
                            {loading ? (
                                <p className="text-muted small mb-0">Cargando…</p>
                            ) : primaryAddress ? (
                                <>
                                    <p className="small text-muted mb-2">
                                        {primaryAddress.type?.trim() || 'Dirección principal'}
                                    </p>
                                    <address className="small text-dark mb-3">
                                        {primaryAddress.address}<br />
                                        {primaryAddress.city}, {primaryAddress.region}
                                        {primaryAddress.postal_code ? ` ${primaryAddress.postal_code}` : ''}<br />
                                        {primaryAddress.country}
                                    </address>
                                </>
                            ) : (
                                <p className="text-muted small mb-3">Aún no has guardado direcciones.</p>
                            )}
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm rounded-pill mt-auto fw-semibold"
                                onClick={() => setActiveTab('addresses')}
                            >
                                Gestionar direcciones
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detalles de Cuenta */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0 h-100 rounded-4">
                        <div className="card-body p-4 d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold mb-0">Detalles de Cuenta</h5>
                            </div>
                            {loading ? (
                                <p className="text-muted small mb-0">Cargando…</p>
                            ) : account ? (
                                <div className="small mb-3">
                                    <div className="mb-2">
                                        <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                                            Nombre
                                        </div>
                                        <div className="fw-semibold text-dark">{account.name}</div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                                            Correo
                                        </div>
                                        <div className="text-dark text-break">{account.email}</div>
                                    </div>
                                    {account.phone && (
                                        <div>
                                            <div className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                                                Teléfono
                                            </div>
                                            <div className="text-dark">{account.phone}</div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted small mb-3">No se pudieron cargar tus datos.</p>
                            )}
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-sm rounded-pill mt-auto fw-semibold"
                                onClick={() => setActiveTab('account')}
                            >
                                Editar datos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

