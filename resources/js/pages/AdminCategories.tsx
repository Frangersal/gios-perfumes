import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Category = {
    id: number;
    name: string;
    description?: string | null;
    image?: string | null;
    parent_id?: number | null;
    parent?: { id: number; name: string } | null;
    products_count?: number;
};

export default function AdminCategories() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/categories`, {
                    headers: { Accept: 'application/json' }
                });
                setCategories(res.data || []);
            } catch (error) {
                console.error('Error cargando categorías', error);
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, [baseUrl]);

    const openDeleteModal = (category: Category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const confirmDelete = async () => {
        if (!categoryToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/categories/${categoryToDelete.id}`, {
                headers: { Accept: 'application/json' }
            });
            setCategories(categories.filter((item) => item.id !== categoryToDelete.id));
            forceCloseDeleteModal();
        } catch (error: any) {
            console.error('Error eliminando categoría', error);
            alert(error?.response?.data?.message || 'No se pudo eliminar la categoría.');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <AdminLayout>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/dashboard`} className="text-decoration-none text-muted">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Categorías</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Categorías</h2>
                <a href={`${baseUrl}/admin/categories/create`} className="btn btn-dark">Nueva Categoría</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando categorías...</div>
                    ) : categories.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay categorías registradas.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Categoría</th>
                                        <th>Padre</th>
                                        <th>Productos</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="ps-4">
                                                <strong>{category.name}</strong>
                                                <small className="text-muted d-block">ID: {category.id}</small>
                                            </td>
                                            <td>{category.parent?.name || '-'}</td>
                                            <td>{category.products_count ?? 0}</td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/categories/${category.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/admin/categories/${category.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(category)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content border-0 shadow">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title fw-bold">Eliminar categoría permanentemente</h5>
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white"
                                        aria-label="Close"
                                        onClick={closeDeleteModal}
                                        disabled={deleting}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <div className="alert alert-warning d-flex align-items-start mb-3" role="alert">
                                        <span className="me-2 fw-bold">!</span>
                                        <div>
                                            Esta accion es irreversible y eliminara la categoría de forma permanente.
                                        </div>
                                    </div>

                                    <p className="mb-2">
                                        Vas a eliminar: <strong>{categoryToDelete?.name || 'Categoría sin nombre'}</strong>
                                    </p>
                                    <p className="mb-0 text-muted small">
                                        Si la categoría tiene productos asociados, la eliminación será bloqueada por seguridad.
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-secondary" onClick={closeDeleteModal} disabled={deleting}>
                                        Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={confirmDelete} disabled={deleting}>
                                        {deleting ? 'Eliminando...' : 'Eliminar definitivamente'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </AdminLayout>
    );
}
