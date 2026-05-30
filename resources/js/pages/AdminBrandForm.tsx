import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminBrandForm() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const isEdit = document.getElementById('root')?.getAttribute('data-page') === 'admin-brand-edit';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        banner: '',
        country_of_origin: '',
        logo: ''
    });

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    useEffect(() => {
        const loadBrand = async () => {
            try {
                if (isEdit && resourceId) {
                    const res = await axios.get(`${baseUrl}/admin/brands/${resourceId}`, {
                        headers: { Accept: 'application/json' }
                    });

                    const brand = res.data;
                    setFormData({
                        name: brand.name || '',
                        description: brand.description || '',
                        banner: brand.banner || '',
                        country_of_origin: brand.country_of_origin || '',
                        logo: brand.logo || ''
                    });
                    setLogoPreview(normalizeImageUrl(brand.logo || ''));
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la información de la marca.');
            } finally {
                setLoading(false);
            }
        };

        loadBrand();
    }, [isEdit, resourceId, baseUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setLogoFromFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleLogoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFromFile(file);
        e.target.value = '';
    };

    const handleLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        setLogoFromFile(file);
    };

    const clearLogo = () => {
        setLogoFile(null);
        setLogoPreview('');
        setFormData({ ...formData, logo: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('description', formData.description);
        payload.append('banner', formData.banner);
        payload.append('country_of_origin', formData.country_of_origin);

        if (logoFile) {
            payload.append('logo_file', logoFile);
        } else if (formData.logo) {
            payload.append('logo', formData.logo);
        }

        try {
            if (isEdit) {
                payload.append('_method', 'PUT');
                await axios.post(`${baseUrl}/admin/brands/${resourceId}`, payload, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/brands`, payload, {
                    headers: { Accept: 'application/json' }
                });
            }

            window.location.href = `${baseUrl}/admin/brands`;
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'No se pudo guardar la marca.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-4 text-center text-muted">Cargando marca...</div>
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
                        <a href={`${baseUrl}/admin/brands`} className="text-decoration-none text-muted">Marcas</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar Marca' : 'Crear Marca'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Marca' : 'Crear Marca'}</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">País de origen</label>
                                <input
                                    type="text"
                                    name="country_of_origin"
                                    className="form-control"
                                    value={formData.country_of_origin}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Logo (una imagen)</label>
                                <div className="d-flex justify-content-end mb-2">
                                    <label htmlFor="brand-logo-input" className="btn btn-sm btn-outline-dark mb-0">
                                        Seleccionar logo
                                    </label>
                                    <input
                                        id="brand-logo-input"
                                        type="file"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={handleLogoInputChange}
                                    />
                                </div>

                                <div
                                    className="border border-secondary-subtle rounded p-3 text-center text-muted"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleLogoDrop}
                                >
                                    Arrastra aquí el logo (solo una imagen).
                                </div>

                                <div className="mt-3 d-flex align-items-center gap-3">
                                    {logoPreview ? (
                                        <img
                                            src={logoPreview}
                                            alt="Logo marca"
                                            className="rounded border"
                                            style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="border rounded d-flex align-items-center justify-content-center text-muted" style={{ width: '72px', height: '72px' }}>
                                            LOGO
                                        </div>
                                    )}
                                    <div>
                                        <small className="text-muted d-block">
                                            {logoFile ? logoFile.name : (formData.logo || 'Sin logo cargado')}
                                        </small>
                                        {(logoPreview || formData.logo) && (
                                            <button type="button" className="btn btn-sm btn-outline-danger mt-2" onClick={clearLogo}>
                                                Quitar logo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Banner (URL o ruta)</label>
                                <input
                                    type="text"
                                    name="banner"
                                    className="form-control"
                                    value={formData.banner}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-dark me-2" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Marca'}
                            </button>
                            <a href={`${baseUrl}/admin/brands`} className="btn btn-outline-secondary">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
