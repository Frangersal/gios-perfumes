import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type ProductNoteRow = {
    note_id: string;
    note_type_id: string;
    position: string;
    intensity: string;
};

type ProductImageRow = {
    existing_image: string;
    file: File | null;
    preview: string;
    is_main: boolean;
};

type ProductVariantRow = {
    volume: string;
    price: string;
    discount_price: string;
    cost: string;
    stock: string;
    min_stock: string;
};

export default function AdminProductForm() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const isEdit = document.getElementById('root')?.getAttribute('data-page') === 'admin-product-edit';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [notes, setNotes] = useState<any[]>([]);
    const [noteTypes, setNoteTypes] = useState<any[]>([]);
    const [productNotes, setProductNotes] = useState<ProductNoteRow[]>([]);
    const [productImages, setProductImages] = useState<ProductImageRow[]>([]);
    const [variants, setVariants] = useState<ProductVariantRow[]>([]);

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        sku: '',
        gender: '',
        olfactory_family: '',
        concentration: '',
        year: '',
        country_of_origin: '',
        status: 'publicado',
        video_url: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        category_id: '',
        brand_id: ''
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
        const fetchDependencies = async () => {
            try {
                const [catsRes, brandsRes, notesMetaRes] = await Promise.all([
                    axios.get(`${baseUrl}/admin/categories`, { headers: { Accept: 'application/json' } }),
                    axios.get(`${baseUrl}/admin/brands`, { headers: { Accept: 'application/json' } }),
                    axios.get(`${baseUrl}/admin/products-note-metadata`, { headers: { Accept: 'application/json' } })
                ]);

                setCategories(catsRes.data);
                setBrands(brandsRes.data);
                setNotes(notesMetaRes.data.notes || []);
                setNoteTypes(notesMetaRes.data.note_types || []);

                if (isEdit && resourceId) {
                    const pRes = await axios.get(`${baseUrl}/admin/products/${resourceId}`, {
                        headers: { Accept: 'application/json' }
                    });
                    const p = pRes.data;

                    setFormData({
                        name: p.name || '',
                        slug: p.slug || '',
                        description: p.description || '',
                        sku: p.sku || '',
                        gender: p.gender || '',
                        olfactory_family: p.olfactory_family || '',
                        concentration: p.concentration || '',
                        year: p.year || '',
                        country_of_origin: p.country_of_origin || '',
                        status: p.status || 'publicado',
                        video_url: p.video_url || '',
                        meta_title: p.meta_title || '',
                        meta_description: p.meta_description || '',
                        meta_keywords: p.meta_keywords || '',
                        category_id: p.category_id || '',
                        brand_id: p.brand_id || ''
                    });

                    setVariants(
                        (p.variants || []).map((variant: any) => ({
                            volume: String(variant.volume ?? ''),
                            price: variant.price !== null && variant.price !== undefined ? String(variant.price) : '',
                            discount_price: variant.discount_price !== null && variant.discount_price !== undefined ? String(variant.discount_price) : '',
                            cost: variant.cost !== null && variant.cost !== undefined ? String(variant.cost) : '',
                            stock: variant.stock !== null && variant.stock !== undefined ? String(variant.stock) : '',
                            min_stock: variant.min_stock !== null && variant.min_stock !== undefined ? String(variant.min_stock) : '',
                        }))
                    );

                    setProductNotes(
                        (p.notes || []).map((note: any) => ({
                            note_id: String(note.id || ''),
                            note_type_id: String(note.pivot?.note_type_id || ''),
                            position: String(note.pivot?.position || ''),
                            intensity: String(note.pivot?.intensity || ''),
                        }))
                    );

                    setProductImages(
                        (p.images || []).map((img: any) => ({
                            existing_image: img.image || '',
                            file: null,
                            preview: normalizeImageUrl(img.image || ''),
                            is_main: Boolean(img.is_main),
                        }))
                    );
                } else {
                    setProductNotes([{ note_id: '', note_type_id: '', position: '', intensity: '' }]);
                    setProductImages([]);
                    setVariants([{ volume: '100ml', price: '', discount_price: '', cost: '', stock: '0', min_stock: '0' }]);
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la información inicial.');
            } finally {
                setLoading(false);
            }
        };

        fetchDependencies();
    }, [isEdit, resourceId, baseUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const validImages = productImages.filter((item) => item.file || item.existing_image);
        if (validImages.length === 0) {
            setError('Debes cargar al menos una imagen de producto.');
            setSubmitting(false);
            return;
        }

        const validVariants = variants.filter((item) => item.volume.trim() !== '' && item.price.trim() !== '');
        if (validVariants.length === 0) {
            setError('Debes registrar al menos una variante con volumen y precio.');
            setSubmitting(false);
            return;
        }

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            payload.append(key, String(value ?? ''));
        });

        validVariants.forEach((item, index) => {
            payload.append(`variants[${index}][volume]`, item.volume);
            payload.append(`variants[${index}][price]`, item.price);
            payload.append(`variants[${index}][discount_price]`, item.discount_price);
            payload.append(`variants[${index}][cost]`, item.cost);
            payload.append(`variants[${index}][stock]`, item.stock);
            payload.append(`variants[${index}][min_stock]`, item.min_stock);
        });

        productNotes
            .filter((item) => item.note_id)
            .forEach((item, index) => {
                payload.append(`product_notes[${index}][note_id]`, item.note_id);
                payload.append(`product_notes[${index}][note_type_id]`, item.note_type_id);
                payload.append(`product_notes[${index}][position]`, item.position);
                payload.append(`product_notes[${index}][intensity]`, item.intensity);
            });

        validImages.forEach((item, index) => {
            if (item.existing_image) {
                payload.append(`product_images[${index}][existing_image]`, item.existing_image);
            }
            if (item.file) {
                payload.append(`product_images[${index}][image]`, item.file);
            }
            payload.append(`product_images[${index}][is_main]`, item.is_main ? '1' : '0');
        });

        try {
            if (isEdit) {
                payload.append('_method', 'PUT');
                await axios.post(`${baseUrl}/admin/products/${resourceId}`, payload, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/products`, payload, {
                    headers: { Accept: 'application/json' }
                });
            }
            window.location.href = `${baseUrl}/admin/products`;
        } catch (err: any) {
            console.error(err);
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError('Ocurrió un error al guardar el producto.');
            }
            setSubmitting(false);
        }
    };

    const handleProductNoteChange = (index: number, field: keyof ProductNoteRow, value: string) => {
        const updated = [...productNotes];
        updated[index] = { ...updated[index], [field]: value };
        setProductNotes(updated);
    };

    const addProductNote = () => {
        setProductNotes([...productNotes, { note_id: '', note_type_id: '', position: '', intensity: '' }]);
    };

    const removeProductNote = (index: number) => {
        setProductNotes(productNotes.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: keyof ProductVariantRow, value: string) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const addVariant = () => {
        setVariants([...variants, { volume: '', price: '', discount_price: '', cost: '', stock: '0', min_stock: '0' }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const getNoteById = (noteId: string) => notes.find((note) => String(note.id) === noteId);

    const setMainImage = (index: number) => {
        setProductImages(productImages.map((img, i) => ({ ...img, is_main: i === index })));
    };

    const removeProductImage = (index: number) => {
        const next = productImages.filter((_, i) => i !== index);
        if (next.length > 0 && !next.some((img) => img.is_main)) {
            next[0].is_main = true;
        }
        setProductImages(next);
    };

    const addImagesFromFiles = (files: File[]) => {
        const validFiles = files.filter((file) => file.type.startsWith('image/'));
        if (validFiles.length === 0) return;

        setProductImages((prev) => {
            const hasMain = prev.some((img) => img.is_main);
            const newRows: ProductImageRow[] = validFiles.map((file) => ({
                existing_image: '',
                file,
                preview: URL.createObjectURL(file),
                is_main: false,
            }));
            const next = [...prev, ...newRows];
            if (!hasMain && next.length > 0) {
                next[0].is_main = true;
            }
            return next;
        });
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        addImagesFromFiles(files);
        e.target.value = '';
    };

    const handleDropImages = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        addImagesFromFiles(files);
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-4 text-center">Cargando producto...</div>
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
                        <a href={`${baseUrl}/admin/products`} className="text-decoration-none text-muted">Productos</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar Producto' : 'Crear Producto'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Producto' : 'Crear Producto'}</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Nombre del Producto</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Slug (URL amigable)</label>
                                <input type="text" className="form-control" name="slug" value={formData.slug} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">SKU</label>
                                <input type="text" className="form-control" name="sku" value={formData.sku} onChange={handleChange} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Categoría</label>
                                <select className="form-select" name="category_id" value={formData.category_id} onChange={handleChange} required>
                                    <option value="">Seleccione una categoría...</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Marca</label>
                                <select className="form-select" name="brand_id" value={formData.brand_id} onChange={handleChange} required>
                                    <option value="">Seleccione una marca...</option>
                                    {brands.map((b) => (
                                        <option key={b.id} value={b.id}>{b.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Estado</label>
                                <select className="form-select" name="status" value={formData.status} onChange={handleChange} required>
                                    <option value="publicado">Publicado</option>
                                    <option value="oculto">Oculto</option>
                                </select>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label">Género</label>
                                <input type="text" className="form-control" name="gender" value={formData.gender} onChange={handleChange} placeholder="Masculino, Femenino, Unisex" />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Familia olfativa</label>
                                <input type="text" className="form-control" name="olfactory_family" value={formData.olfactory_family} onChange={handleChange} placeholder="Amaderada, Citrica..." />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Concentración</label>
                                <input type="text" className="form-control" name="concentration" value={formData.concentration} onChange={handleChange} placeholder="EDP, EDT..." />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">Año</label>
                                <input type="number" className="form-control" name="year" value={formData.year} onChange={handleChange} />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label">País de origen</label>
                                <input type="text" className="form-control" name="country_of_origin" value={formData.country_of_origin} onChange={handleChange} />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Descripción</label>
                                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows={4} />
                            </div>

                            <div className="col-12">
                                <label className="form-label">URL de video</label>
                                <input type="url" className="form-control" name="video_url" value={formData.video_url} onChange={handleChange} placeholder="https://..." />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Meta title</label>
                                <input type="text" className="form-control" name="meta_title" value={formData.meta_title} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Meta keywords</label>
                                <input type="text" className="form-control" name="meta_keywords" value={formData.meta_keywords} onChange={handleChange} />
                            </div>
                            <div className="col-12">
                                <label className="form-label">Meta description</label>
                                <textarea className="form-control" name="meta_description" value={formData.meta_description} onChange={handleChange} rows={3} />
                            </div>

                            <div className="col-12 mt-3">
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h5 className="mb-0">Variantes / presentaciones</h5>
                                        <small className="text-muted">El precio, descuento, costo y stock se gestionan aquí por presentación (50ml, 100ml, etc.)</small>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={addVariant}>
                                        Agregar variante
                                    </button>
                                </div>

                                {variants.length === 0 ? (
                                    <div className="alert alert-light border">No hay variantes registradas. Debes añadir al menos una.</div>
                                ) : (
                                    variants.map((item, index) => (
                                        <div className="row g-2 align-items-end mb-2" key={`variant-row-${index}`}>
                                            <div className="col-md-2">
                                                <label className="form-label">Volumen</label>
                                                <input type="text" className="form-control" value={item.volume} placeholder="100ml" onChange={(e) => handleVariantChange(index, 'volume', e.target.value)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Precio</label>
                                                <input type="number" step="0.01" min="0" className="form-control" value={item.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Precio descuento</label>
                                                <input type="number" step="0.01" min="0" className="form-control" value={item.discount_price} onChange={(e) => handleVariantChange(index, 'discount_price', e.target.value)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Costo</label>
                                                <input type="number" step="0.01" min="0" className="form-control" value={item.cost} onChange={(e) => handleVariantChange(index, 'cost', e.target.value)} />
                                            </div>
                                            <div className="col-md-1">
                                                <label className="form-label">Stock</label>
                                                <input type="number" min="0" className="form-control" value={item.stock} onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Stock mínimo</label>
                                                <input type="number" min="0" className="form-control" value={item.min_stock} onChange={(e) => handleVariantChange(index, 'min_stock', e.target.value)} />
                                            </div>
                                            <div className="col-md-1 d-grid">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => removeVariant(index)}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="col-12 mt-3">
                                <hr className="my-3" />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h5 className="mb-0">Imágenes del producto</h5>
                                        <small className="text-muted">Tabla product_images (carga por archivo)</small>
                                    </div>
                                    <div>
                                        <label htmlFor="product-images-input" className="btn btn-sm btn-outline-dark mb-0">
                                            Seleccionar imágenes
                                        </label>
                                        <input
                                            id="product-images-input"
                                            type="file"
                                            className="d-none"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageInputChange}
                                        />
                                    </div>
                                </div>

                                <div
                                    className="border border-secondary-subtle rounded p-3 text-center text-muted mb-3"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleDropImages}
                                >
                                    Arrastra imágenes aquí o usa Seleccionar imágenes.
                                </div>

                                {productImages.length === 0 ? (
                                    <div className="alert alert-light border">No hay imágenes registradas. Debes cargar al menos una.</div>
                                ) : (
                                    productImages.map((item, index) => (
                                        <div className="row g-2 align-items-end mb-2" key={`img-row-${index}`}>
                                            <div className="col-md-8 d-flex align-items-center gap-3">
                                                {item.preview ? (
                                                    <img
                                                        src={item.preview}
                                                        alt="Imagen producto"
                                                        className="rounded border"
                                                        style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="border rounded d-flex align-items-center justify-content-center text-muted" style={{ width: '72px', height: '72px' }}>
                                                        IMG
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="fw-semibold">Imagen {index + 1}</div>
                                                    <small className="text-muted">{item.file ? item.file.name : item.existing_image}</small>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label d-block">Principal</label>
                                                <div className="form-check mt-2">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name="main_product_image"
                                                        checked={item.is_main}
                                                        onChange={() => setMainImage(index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-grid">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => removeProductImage(index)}>
                                                    Quitar
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}

                                <hr className="my-3" />
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div>
                                        <h5 className="mb-0">Notas de olor</h5>
                                        <small className="text-muted">Configura las notas olfativas del producto</small>
                                    </div>
                                    <button type="button" className="btn btn-sm btn-outline-dark" onClick={addProductNote}>
                                        Agregar nota
                                    </button>
                                </div>

                                {productNotes.length === 0 ? (
                                    <div className="alert alert-light border">No hay notas registradas.</div>
                                ) : (
                                    productNotes.map((item, index) => (
                                        <div className="row g-2 align-items-end mb-2" key={`note-row-${index}`}>
                                            <div className="col-md-4">
                                                <label className="form-label">Nota</label>
                                                <select
                                                    className="form-select"
                                                    value={item.note_id}
                                                    onChange={(e) => handleProductNoteChange(index, 'note_id', e.target.value)}
                                                >
                                                    <option value="">Seleccione una nota...</option>
                                                    {notes.map((note) => (
                                                        <option key={note.id} value={note.id}>{note.name}</option>
                                                    ))}
                                                </select>
                                                {getNoteById(item.note_id)?.image && (
                                                    <img
                                                        src={normalizeImageUrl(getNoteById(item.note_id).image)}
                                                        alt={getNoteById(item.note_id).name || 'Nota'}
                                                        className="mt-2 rounded border"
                                                        style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </div>
                                            <div className="col-md-3">
                                                <label className="form-label">Tipo</label>
                                                <select
                                                    className="form-select"
                                                    value={item.note_type_id}
                                                    onChange={(e) => handleProductNoteChange(index, 'note_type_id', e.target.value)}
                                                >
                                                    <option value="">Seleccione tipo...</option>
                                                    {noteTypes.map((type) => (
                                                        <option key={type.id} value={type.id}>{type.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Posición</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={item.position}
                                                    min="1"
                                                    onChange={(e) => handleProductNoteChange(index, 'position', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <label className="form-label">Intensidad</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    value={item.intensity}
                                                    min="1"
                                                    max="10"
                                                    onChange={(e) => handleProductNoteChange(index, 'intensity', e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-1 d-grid">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => removeProductNote(index)}>
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-dark me-2" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Producto'}
                            </button>
                            <a href={`${baseUrl}/admin/products`} className="btn btn-outline-secondary">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
