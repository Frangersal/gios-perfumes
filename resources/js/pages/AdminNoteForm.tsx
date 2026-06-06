import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminNoteForm() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const isEdit = document.getElementById('root')?.getAttribute('data-page') === 'admin-note-edit';
    const resourceId = document.getElementById('root')?.getAttribute('data-resource-id') || '';

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: ''
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
        const loadNote = async () => {
            try {
                if (isEdit && resourceId) {
                    const res = await axios.get(`${baseUrl}/admin/notes/${resourceId}`, {
                        headers: { Accept: 'application/json' }
                    });

                    const note = res.data;
                    setFormData({
                        name: note.name || '',
                        slug: note.slug || '',
                        description: note.description || '',
                        image: note.image || ''
                    });
                    setImagePreview(normalizeImageUrl(note.image || ''));
                }
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar la información de la nota.');
            } finally {
                setLoading(false);
            }
        };

        loadNote();
    }, [isEdit, resourceId, baseUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const setImageFromFile = (file: File) => {
        if (!file.type.startsWith('image/')) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFromFile(file);
        e.target.value = '';
    };

    const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (!file) return;
        setImageFromFile(file);
    };

    const clearImage = () => {
        setImageFile(null);
        setImagePreview('');
        setFormData({ ...formData, image: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('slug', formData.slug);
        payload.append('description', formData.description);

        if (imageFile) {
            payload.append('image_file', imageFile);
        } else if (formData.image) {
            payload.append('image', formData.image);
        }

        try {
            if (isEdit) {
                payload.append('_method', 'PUT');
                await axios.post(`${baseUrl}/admin/notes/${resourceId}`, payload, {
                    headers: { Accept: 'application/json' }
                });
            } else {
                await axios.post(`${baseUrl}/admin/notes`, payload, {
                    headers: { Accept: 'application/json' }
                });
            }

            window.location.href = `${baseUrl}/admin/notes`;
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message || 'No se pudo guardar la nota.');
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="p-4 text-center text-muted">Cargando nota...</div>
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
                        <a href={`${baseUrl}/admin/notes`} className="text-decoration-none text-muted">Notas de olor</a>
                    </li>
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">
                        {isEdit ? 'Editar Nota' : 'Crear Nota'}
                    </li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">{isEdit ? 'Editar Nota de olor' : 'Crear Nota de olor'}</h2>
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
                                <label className="form-label">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    className="form-control"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="Opcional (si lo dejas vacío se genera automáticamente)"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Descripción</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe brevemente esta nota olfativa (familia, sensación, perfumes en los que aparece, etc.)"
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">Imagen (una imagen)</label>
                                <div className="d-flex justify-content-end mb-2">
                                    <label htmlFor="note-image-input" className="btn btn-sm btn-outline-dark mb-0">
                                        Seleccionar imagen
                                    </label>
                                    <input
                                        id="note-image-input"
                                        type="file"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={handleImageInputChange}
                                    />
                                </div>

                                <div
                                    className="border border-secondary-subtle rounded p-3 text-center text-muted"
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleImageDrop}
                                >
                                    Arrastra aquí la imagen de la nota (solo una imagen).
                                </div>

                                <div className="mt-3 d-flex align-items-center gap-3">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Imagen nota"
                                            className="rounded border"
                                            style={{ width: '72px', height: '72px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="border rounded d-flex align-items-center justify-content-center text-muted" style={{ width: '72px', height: '72px' }}>
                                            IMG
                                        </div>
                                    )}
                                    <div>
                                        <small className="text-muted d-block">
                                            {imageFile ? imageFile.name : (formData.image || 'Sin imagen cargada')}
                                        </small>
                                        {(imagePreview || formData.image) && (
                                            <button type="button" className="btn btn-sm btn-outline-danger mt-2" onClick={clearImage}>
                                                Quitar imagen
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button type="submit" className="btn btn-dark me-2" disabled={submitting}>
                                {submitting ? 'Guardando...' : 'Guardar Nota'}
                            </button>
                            <a href={`${baseUrl}/admin/notes`} className="btn btn-outline-secondary">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
