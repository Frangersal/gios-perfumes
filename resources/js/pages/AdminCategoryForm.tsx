import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type CategoryOption = {
    id: number;
    name: string;
};

export default function AdminCategoryForm() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const isEdit = document.getElementById('root')?.getAttribute('data-page') === 'admin-category-edit';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<CategoryOption[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        parent_id: ''
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoriesRes = await axios.get(`${baseUrl}/admin/categories`, {
                    headers: { Accept: 'application/json' }
                });

                const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : [];
                setCategories(categoriesData);

                if (isEdit && resourceId) {
                    const categoryRes = await axios.get(`${baseUrl}/admin/categories/${resourceId}`, {
                        headers: { Accept: 'application/json' }
                    });

                    const category = categoryRes.data;
                    setFormData({
                        name: category.name || '',
                        description: category.description || '',
                        image: category.image || '',
                        parent_id: category.parent_id ? String(category.parent_id) : ''
                    });
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la información inicial.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [baseUrl, isEdit, resourceId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const payload: Record<string, string> = {
            name: formData.name,
            description: formData.description,
            image: formData.image,
            parent_id: formData.parent_id,
        };

        try {
            if (isEdit) {
                await axios.put(`${baseUrl}/admin/categories/${resourceId}`, payload, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/categories`, payload, {
                    headers: { Accept: 'application/json' }
                });
            }

            window.location.href = `${baseUrl}/admin/categories`;
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'No se pudo guardar la categoría.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-4 text-center text-muted">Cargando categoría...</div>
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
                        <a href={`${baseUrl}/admin/categories`} className="text-decoration-none text-muted">Categorías</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar Categoría' : 'Crear Categoría'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Categoría' : 'Crear Categoría'}</h2>
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
                                <label className="form-label">Categoría padre</label>
                                <select
                                    name="parent_id"
                                    className="form-select"
                                    value={formData.parent_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Sin categoría padre</option>
                                    {categories
                                        .filter((item) => String(item.id) !== resourceId)
                                        .map((item) => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                </select>
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
                                <label className="form-label">Imagen (URL o ruta)</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-dark me-2" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Categoría'}
                            </button>
                            <a href={`${baseUrl}/admin/categories`} className="btn btn-outline-secondary">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
