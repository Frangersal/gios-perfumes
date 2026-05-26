import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type ProductDetails = {
    id?: number;
    brand_id?: number | null;
    category_id?: number | null;
    name?: string | null;
    slug?: string | null;
    description?: string | null;
    price?: number | string | null;
    discount_price?: number | string | null;
    cost?: number | string | null;
    sku?: string | null;
    gender?: string | null;
    olfactory_family?: string | null;
    concentration?: string | null;
    year?: number | null;
    country_of_origin?: string | null;
    status?: string | null;
    discount_percentage?: number | null;
    video_url?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    brand?: { id?: number; name?: string } | null;
    category?: { id?: number; name?: string } | null;
    notes?: Array<{
        id?: number;
        name?: string;
        image?: string | null;
        pivot?: {
            note_type_id?: number | null;
            position?: number | null;
            intensity?: number | null;
        };
    }>;
    product_notes?: Array<{
        note_id?: number;
        note_type?: { id?: number; name?: string } | null;
    }>;
    images?: Array<{
        id?: number;
        image?: string | null;
        is_main?: boolean;
    }>;
};

const fields: Array<{ key: keyof ProductDetails; label: string }> = [
    { key: 'id', label: 'ID' },
    { key: 'brand_id', label: 'Brand ID' },
    { key: 'category_id', label: 'Category ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'slug', label: 'Slug' },
    { key: 'description', label: 'Descripcion' },
    { key: 'price', label: 'Precio' },
    { key: 'discount_price', label: 'Precio con descuento' },
    { key: 'cost', label: 'Costo' },
    { key: 'sku', label: 'SKU' },
    { key: 'gender', label: 'Genero' },
    { key: 'olfactory_family', label: 'Familia olfativa' },
    { key: 'concentration', label: 'Concentracion' },
    { key: 'year', label: 'Año' },
    { key: 'country_of_origin', label: 'Pais de origen' },
    { key: 'status', label: 'Estado' },
    { key: 'discount_percentage', label: 'Porcentaje de descuento' },
    { key: 'video_url', label: 'Video URL' },
    { key: 'meta_title', label: 'Meta title' },
    { key: 'meta_description', label: 'Meta description' },
    { key: 'meta_keywords', label: 'Meta keywords' },
    { key: 'created_at', label: 'Creado en' },
    { key: 'updated_at', label: 'Actualizado en' }
];

export default function AdminProductDetails() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [product, setProduct] = useState<ProductDetails | null>(null);
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
        const loadProduct = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/products/${resourceId}`, {
                    headers: { Accept: 'application/json' }
                });
                setProduct(res.data);
            } catch (err) {
                console.error('Error cargando detalle del producto', err);
                setError('No se pudo cargar el detalle del producto.');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [baseUrl, resourceId]);

    const renderValue = (value: unknown) => {
        if (value === null || value === undefined || value === '') return '-';
        if (typeof value === 'boolean') return value ? 'Si' : 'No';
        return String(value);
    };

    const resolveNoteType = (noteId?: number, fallbackTypeId?: number | null) => {
        if (!noteId) return '-';

        const productNote = (product?.product_notes || []).find((item) => item.note_id === noteId);
        if (productNote?.note_type?.name) return productNote.note_type.name;

        if (fallbackTypeId) return `Tipo #${fallbackTypeId}`;
        return '-';
    };

    const renderFieldValue = (key: keyof ProductDetails) => {
        if (key === 'brand_id') {
            if (!product?.brand_id) return '-';
            return `${product.brand_id} (${product.brand?.name || 'Sin marca'})`;
        }

        if (key === 'category_id') {
            if (!product?.category_id) return '-';
            return `${product.category_id} (${product.category?.name || 'Sin categoría'})`;
        }

        return renderValue(product?.[key]);
    };

    return (
        <AdminLayout>
            <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/dashboard`} className="text-decoration-none text-muted">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/admin/products`} className="text-decoration-none text-muted">Productos</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Detalle</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Detalle del Producto</h2>
                    <p className="text-muted mb-0">
                        Visualiza todos los parametros almacenados en la base de datos para este producto.
                    </p>
                </div>
                <div>
                    <a href={`${baseUrl}/admin/products/${resourceId}/edit`} className="btn btn-outline-secondary me-2">Editar</a>
                    <a href={`${baseUrl}/admin/products`} className="btn btn-dark">Volver al listado</a>
                </div>
            </div>

            {loading ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 text-center text-muted">Cargando detalle del producto...</div>
                </div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <small className="text-muted d-block">Marca</small>
                                    <strong>{product?.brand?.name || '-'}</strong>
                                </div>
                                <div className="col-md-6">
                                    <small className="text-muted d-block">Categoria</small>
                                    <strong>{product?.category?.name || '-'}</strong>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                        {fields.map((field) => (
                                            <tr key={field.key}>
                                                <td className="ps-4 fw-semibold">{field.label}</td>
                                                <td className="pe-4">{renderFieldValue(field.key)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm mb-3">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Imágenes del producto</h5>
                                <small className="text-muted">Datos vinculados a product_images</small>
                            </div>
                            {(product?.images || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">No hay imágenes registradas para este producto.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Preview</th>
                                                <th>URL</th>
                                                <th className="pe-4">Principal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(product?.images || []).map((img) => (
                                                <tr key={`product-image-${img.id}`}>
                                                    <td className="ps-4">
                                                        {img.image ? (
                                                            <img
                                                                src={normalizeImageUrl(img.image)}
                                                                alt="Imagen producto"
                                                                className="rounded border"
                                                                style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                                                            />
                                                        ) : '-'}
                                                    </td>
                                                    <td>{img.image || '-'}</td>
                                                    <td className="pe-4">{img.is_main ? 'Sí' : 'No'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                                <h5 className="mb-0">Notas de olor</h5>
                                <small className="text-muted">Notas configuradas para este producto</small>
                            </div>
                            {(product?.notes || []).length === 0 ? (
                                <div className="p-4 text-center text-muted">No hay notas de olor registradas.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th className="ps-4">Imagen</th>
                                                <th className="ps-4">Nota</th>
                                                <th>Tipo</th>
                                                <th>Posición</th>
                                                <th className="pe-4">Intensidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(product?.notes || []).map((note) => (
                                                <tr key={`note-${note.id}`}>
                                                    <td className="ps-4">
                                                        {note.image ? (
                                                            <img
                                                                src={normalizeImageUrl(note.image)}
                                                                alt={note.name || 'Nota'}
                                                                className="rounded border"
                                                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                                            />
                                                        ) : '-'}
                                                    </td>
                                                    <td className="ps-4 fw-semibold">{note.name || '-'}</td>
                                                    <td>{resolveNoteType(note.id, note.pivot?.note_type_id)}</td>
                                                    <td>{renderValue(note.pivot?.position)}</td>
                                                    <td className="pe-4">{renderValue(note.pivot?.intensity)}</td>
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
