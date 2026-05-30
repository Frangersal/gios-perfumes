import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Brand = {
    id: number;
    name: string;
    logo?: string | null;
    description?: string | null;
    country_of_origin?: string | null;
    products_count?: number;
};

export default function AdminBrands() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [brandToDelete, setBrandToDelete] = useState<Brand | null>(null);
    const [deleting, setDeleting] = useState(false);

    const normalizeImageUrl = (url?: string | null): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    useEffect(() => {
        const loadBrands = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/brands`, {
                    headers: { Accept: 'application/json' }
                });
                setBrands(res.data || []);
            } catch (error) {
                console.error('Error cargando marcas', error);
            } finally {
                setLoading(false);
            }
        };

        loadBrands();
    }, [baseUrl]);

    const openDeleteModal = (brand: Brand) => {
        setBrandToDelete(brand);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setBrandToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setBrandToDelete(null);
    };

    const confirmDelete = async () => {
        if (!brandToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/brands/${brandToDelete.id}`, {
                headers: { Accept: 'application/json' }
            });
            setBrands(brands.filter((item) => item.id !== brandToDelete.id));
            forceCloseDeleteModal();
        } catch (error: any) {
            console.error('Error eliminando marca', error);
            alert(error?.response?.data?.message || 'No se pudo eliminar la marca.');
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
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Marcas</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Marcas</h2>
                <a href={`${baseUrl}/admin/brands/create`} className="btn btn-dark">Nueva Marca</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando marcas...</div>
                    ) : brands.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay marcas registradas.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Marca</th>
                                        <th>País de origen</th>
                                        <th>Productos</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brands.map((brand) => (
                                        <tr key={brand.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    {normalizeImageUrl(brand.logo) ? (
                                                        <img
                                                            src={normalizeImageUrl(brand.logo)}
                                                            alt={brand.name || 'Marca'}
                                                            className="rounded border me-3"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div className="bg-light rounded me-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '40px', height: '40px' }}>
                                                            <small>LOGO</small>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <strong>{brand.name}</strong>
                                                        <small className="text-muted d-block">ID: {brand.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{brand.country_of_origin || '-'}</td>
                                            <td>{brand.products_count ?? 0}</td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/brands/${brand.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/admin/brands/${brand.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(brand)} className="btn btn-sm btn-outline-danger">Eliminar</button>
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
                                    <h5 className="modal-title fw-bold">Eliminar marca permanentemente</h5>
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
                                            Esta accion es irreversible y eliminara la marca de forma permanente.
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted small">
                                        Si la marca tiene productos asociados, la eliminación será bloqueada por seguridad.
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
