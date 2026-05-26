import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminProducts() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<any | null>(null);
    const [deleting, setDeleting] = useState(false);

    const normalizeImageUrl = (url?: string): string => {
        if (!url) return '';
        if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
            return url;
        }

        const normalizedBase = baseUrl.replace(/\/$/, '');
        const normalizedPath = url.startsWith('/') ? url : `/${url}`;

        return `${normalizedBase}${normalizedPath}`;
    };

    const getMainProductImageUrl = (product: any): string => {
        const images = Array.isArray(product?.images) ? product.images : [];
        const mainImage = images.find((img: any) => Boolean(img?.is_main)) || images[0];
        return normalizeImageUrl(mainImage?.image || '');
    };

    const loadProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/admin/products`, {
                headers: { 'Accept': 'application/json' }
            });
            setProducts(res.data);
        } catch (error) {
            console.error('Error cargando productos', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const openDeleteModal = (product: any) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    const confirmDelete = async () => {
        if (!productToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/products/${productToDelete.id}`, {
                headers: { 'Accept': 'application/json' }
            });
            setProducts(products.filter(p => p.id !== productToDelete.id));
            forceCloseDeleteModal();
        } catch (error) {
            console.error('Error eliminando producto', error);
            alert('No se pudo eliminar el producto.');
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
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Productos</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Productos</h2>
                <a href={`${baseUrl}/admin/products/create`} className="btn btn-dark">Nuevo Producto</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando productos...</div>
                    ) : products.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay productos registrados.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Producto</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Estado</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    {getMainProductImageUrl(product) ? (
                                                        <img
                                                            src={getMainProductImageUrl(product)}
                                                            alt={product.name || 'Producto'}
                                                            className="rounded border me-3"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div className="bg-light rounded me-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '40px', height: '40px' }}>
                                                            <small>IMG</small>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <strong>{product.name}</strong><br/>
                                                        <small className="text-muted d-block">SKU: {product.sku}</small>
                                                        <small className="text-muted d-block">ID: {product.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product.category ? product.category.name : '-'}</td>
                                            <td>${typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}</td>
                                            <td>
                                                <span className={`badge bg-${
                                                    product.status === 'publicado' || product.status === 'active'
                                                        ? 'success'
                                                        : (product.status === 'draft' ? 'warning' : 'secondary')
                                                }`}>
                                                    {product.status === 'publicado' || product.status === 'active'
                                                        ? 'Publicado'
                                                        : (product.status === 'draft'
                                                            ? 'Borrador'
                                                            : (product.status === 'oculto'
                                                                ? 'Oculto'
                                                                : 'Inactivo'))}
                                                </span>
                                            </td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/products/${product.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/product/${product.id}`} className="btn btn-sm btn-dark me-2" target="_blank" rel="noopener noreferrer">Ver en línea</a>
                                                <a href={`${baseUrl}/admin/products/${product.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(product)} className="btn btn-sm btn-outline-danger">Eliminar</button>
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
                                    <h5 className="modal-title fw-bold">Eliminar producto permanentemente</h5>
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
                                            Esta accion es irreversible y eliminara el producto de forma permanente.
                                        </div>
                                    </div>

                                    <p className="mb-2">
                                        Vas a eliminar: <strong>{productToDelete?.name || 'Producto sin nombre'}</strong>
                                    </p>
                                    <p className="mb-0 text-muted small">
                                        Recomendacion: si solo quieres ocultarlo del publico, cambia su estado a <strong>oculto</strong> en lugar de eliminarlo.
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
