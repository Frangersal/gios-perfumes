import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type CategoryDetails = {
    id?: number;
    name?: string;
    description?: string | null;
    image?: string | null;
    parent_id?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    parent?: { id?: number; name?: string } | null;
    products?: Array<{
        id?: number;
        name?: string;
        sku?: string;
        price?: number | string;
        status?: string;
    }>;
};

export default function AdminCategoryDetails() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [category, setCategory] = useState<CategoryDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/categories/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                setCategory(res.data);
            } catch (err) {
                console.error('Error cargando detalle de la categoría', err);
                setError('No se pudo cargar el detalle de la categoría.');
            } finally {
                setLoading(false);
            }
        };

        loadCategory();
    }, [baseUrl, resourceId]);

    const renderValue = (value: unknown) => {
        if (value === null || value === undefined || value === '') return '-';
        return String(value);
    };

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
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Detalle</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Detalle de la Categoría</h2>
                    <p className="text-muted mb-0">Información completa de la categoría y productos asociados.</p>
                </div>
                <div>
                    <a href={`${baseUrl}/admin/categories/${resourceId}/edit`} className="btn btn-outline-secondary me-2">Editar</a>
                    <a href={`${baseUrl}/admin/categories`} className="btn btn-dark">Volver al listado</a>
                </div>
            </div>

            {loading ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-center text-muted">Cargando detalle de la categoría...</div>
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
                                        <tr>
                                            <td className="ps-4 fw-semibold">ID</td>
                                            <td className="pe-4">{renderValue(category?.id)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Nombre</td>
                                            <td className="pe-4">{renderValue(category?.name)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Descripción</td>
                                            <td className="pe-4">{renderValue(category?.description)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Imagen</td>
                                            <td className="pe-4">{renderValue(category?.image)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Categoría padre</td>
                                            <td className="pe-4">
                                                {category?.parent_id ? `${category.parent_id} (${category?.parent?.name || 'Sin nombre'})` : '-'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Creado en</td>
                                            <td className="pe-4">{renderValue(category?.created_at)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Actualizado en</td>
                                            <td className="pe-4">{renderValue(category?.updated_at)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Productos que usan esta categoría</h5>
                                <small className="text-muted">Relación products.category_id</small>
                            </div>
                            {(category?.products || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">No hay productos asociados a esta categoría.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">ID</th>
                                                <th>Nombre</th>
                                                <th>SKU</th>
                                                <th>Precio</th>
                                                <th>Estado</th>
                                                <th className="pe-4 text-end">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(category?.products || []).map((product) => (
                                                <tr key={`category-product-${product.id}`}>
                                                    <td className="ps-4">{product.id}</td>
                                                    <td>{product.name || '-'}</td>
                                                    <td>{product.sku || '-'}</td>
                                                    <td>{product.price ?? '-'}</td>
                                                    <td>{product.status || '-'}</td>
                                                    <td className="pe-4 text-end">
                                                        <a href={`${baseUrl}/admin/products/${product.id}/details`} className="btn btn-sm btn-outline-dark">Ver detalle</a>
                                                    </td>
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
