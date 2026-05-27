import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type NoteDetails = {
    id?: number;
    name?: string;
    slug?: string;
    image?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    product_notes?: Array<{
        id?: number;
        product_id?: number;
        note_type_id?: number | null;
        position?: number | null;
        intensity?: number | null;
        product?: {
            id?: number;
            name?: string;
            sku?: string;
            status?: string;
            price?: number | string;
        } | null;
        note_type?: {
            id?: number;
            name?: string;
        } | null;
    }>;
};

export default function AdminNoteDetails() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [note, setNote] = useState<NoteDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
        const loadNote = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/notes/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                setNote(res.data);
            } catch (err) {
                console.error('Error cargando detalle de la nota', err);
                setError('No se pudo cargar el detalle de la nota.');
            } finally {
                setLoading(false);
            }
        };

        loadNote();
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
                        <a href={`${baseUrl}/admin/notes`} className="text-decoration-none text-muted">Notas de olor</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Detalle</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Detalle de la Nota</h2>
                    <p className="text-muted mb-0">Información de la nota y su uso en product_notes.</p>
                </div>
                <div>
                    <a href={`${baseUrl}/admin/notes/${resourceId}/edit`} className="btn btn-outline-secondary me-2">Editar</a>
                    <a href={`${baseUrl}/admin/notes`} className="btn btn-dark">Volver al listado</a>
                </div>
            </div>

            {loading ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-center text-muted">Cargando detalle de la nota...</div>
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
                                            <td className="pe-4">{renderValue(note?.id)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Nombre</td>
                                            <td className="pe-4">{renderValue(note?.name)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Slug</td>
                                            <td className="pe-4">{renderValue(note?.slug)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Imagen</td>
                                            <td className="pe-4">
                                                {normalizeImageUrl(note?.image) ? (
                                                    <img
                                                        src={normalizeImageUrl(note?.image)}
                                                        alt={note?.name || 'Imagen nota'}
                                                        className="rounded border"
                                                        style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                                                    />
                                                ) : '-'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Creado en</td>
                                            <td className="pe-4">{renderValue(note?.created_at)}</td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 fw-semibold">Actualizado en</td>
                                            <td className="pe-4">{renderValue(note?.updated_at)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Uso de la nota en productos</h5>
                                <small className="text-muted">Tablas: product_notes + note_types</small>
                            </div>
                            {(note?.product_notes || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">Esta nota no está asociada a productos.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Producto</th>
                                                <th>Tipo</th>
                                                <th>Posición</th>
                                                <th>Intensidad</th>
                                                <th>Estado</th>
                                                <th className="pe-4 text-end">Acción</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(note?.product_notes || []).map((item) => (
                                                <tr key={`note-usage-${item.id}`}>
                                                    <td className="ps-4">
                                                        <strong>{item.product?.name || '-'}</strong>
                                                        <small className="text-muted d-block">SKU: {item.product?.sku || '-'}</small>
                                                    </td>
                                                    <td>{item.note_type?.name || '-'}</td>
                                                    <td>{renderValue(item.position)}</td>
                                                    <td>{renderValue(item.intensity)}</td>
                                                    <td>{item.product?.status || '-'}</td>
                                                    <td className="pe-4 text-end">
                                                        {item.product?.id ? (
                                                            <a href={`${baseUrl}/admin/products/${item.product.id}/details`} className="btn btn-sm btn-outline-dark">Ver producto</a>
                                                        ) : (
                                                            '-'
                                                        )}
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
