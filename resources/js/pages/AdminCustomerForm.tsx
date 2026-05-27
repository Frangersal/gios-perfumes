import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type CustomerFormData = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export default function AdminCustomerForm() {
    const rootEl = document.getElementById('root');
    const baseUrl = rootEl?.getAttribute('data-base-url') || '';
    const resourceId = rootEl?.getAttribute('data-resource-id');
    const isEdit = Boolean(resourceId);

    const [formData, setFormData] = useState<CustomerFormData>({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(isEdit);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        if (!isEdit || !resourceId) return;

        const loadCustomer = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/customers/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                const customer = res.data;
                setFormData({
                    name: customer?.name || '',
                    email: customer?.email || '',
                    phone: customer?.phone || '',
                    password: ''
                });
            } catch (error) {
                console.error('Error cargando cliente', error);
            } finally {
                setLoading(false);
            }
        };

        loadCustomer();
    }, [baseUrl, isEdit, resourceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            if (isEdit && resourceId) {
                await axios.put(`${baseUrl}/admin/customers/${resourceId}`, formData, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/customers`, formData, {
                    headers: { Accept: 'application/json' }
                });
            }

            window.location.href = `${baseUrl}/admin/customers`;
        } catch (error: any) {
            const validationErrors = error?.response?.data?.errors;
            if (validationErrors) {
                setErrors(validationErrors);
            } else {
                alert(error?.response?.data?.message || 'No se pudo guardar el cliente.');
            }
        } finally {
            setSaving(false);
        }
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
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar cliente' : 'Nuevo cliente'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Cliente' : 'Crear Cliente'}</h2>
                <a href={`${baseUrl}/admin/customers`} className="btn btn-outline-secondary">Volver</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    {loading ? (
                        <p className="text-muted mb-0">Cargando cliente...</p>
                    ) : (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Nombre</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Teléfono</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">
                                        {isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        required={!isEdit}
                                        minLength={6}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">
                                <a href={`${baseUrl}/admin/customers`} className="btn btn-outline-secondary">Cancelar</a>
                                <button type="submit" className="btn btn-dark" disabled={saving}>
                                    {saving ? 'Guardando...' : 'Guardar cliente'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
