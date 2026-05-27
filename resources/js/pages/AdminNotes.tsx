import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../layouts/AdminLayout';

type Note = {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    products_count?: number;
    product_notes_count?: number;
};

export default function AdminNotes() {
    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
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
        const loadNotes = async () => {
            try {
                const res = await axios.get(`${baseUrl}/admin/notes`, {
                    headers: { Accept: 'application/json' }
                });
                setNotes(res.data || []);
            } catch (error) {
                console.error('Error cargando notas', error);
            } finally {
                setLoading(false);
            }
        };

        loadNotes();
    }, [baseUrl]);

    const openDeleteModal = (note: Note) => {
        setNoteToDelete(note);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        if (deleting) return;
        setShowDeleteModal(false);
        setNoteToDelete(null);
    };

    const forceCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setNoteToDelete(null);
    };

    const confirmDelete = async () => {
        if (!noteToDelete?.id) return;

        setDeleting(true);
        try {
            await axios.delete(`${baseUrl}/admin/notes/${noteToDelete.id}`, {
                headers: { Accept: 'application/json' }
            });
            setNotes(notes.filter((item) => item.id !== noteToDelete.id));
            forceCloseDeleteModal();
        } catch (error: any) {
            console.error('Error eliminando nota', error);
            alert(error?.response?.data?.message || 'No se pudo eliminar la nota.');
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
                    <li className="breadcrumb-item active fw-semibold" aria-current="page">Notas de olor</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0">Gestión de Notas de olor</h2>
                <a href={`${baseUrl}/admin/notes/create`} className="btn btn-dark">Nueva Nota</a>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="p-4 text-center text-muted">Cargando notas...</div>
                    ) : notes.length === 0 ? (
                        <div className="p-4 text-center text-muted">No hay notas registradas.</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">Nota</th>
                                        <th>Slug</th>
                                        <th>Productos</th>
                                        <th>Usos en product_notes</th>
                                        <th className="pe-4 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes.map((note) => (
                                        <tr key={note.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    {normalizeImageUrl(note.image) ? (
                                                        <img
                                                            src={normalizeImageUrl(note.image)}
                                                            alt={note.name || 'Nota'}
                                                            className="rounded border me-3"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    ) : (
                                                        <div className="bg-light rounded me-3 d-flex align-items-center justify-content-center text-muted" style={{ width: '40px', height: '40px' }}>
                                                            <small>IMG</small>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <strong>{note.name}</strong>
                                                        <small className="text-muted d-block">ID: {note.id}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{note.slug}</td>
                                            <td>{note.products_count ?? 0}</td>
                                            <td>{note.product_notes_count ?? 0}</td>
                                            <td className="pe-4 text-end">
                                                <a href={`${baseUrl}/admin/notes/${note.id}/details`} className="btn btn-sm btn-outline-dark me-2">Ver detalle</a>
                                                <a href={`${baseUrl}/admin/notes/${note.id}/edit`} className="btn btn-sm btn-outline-secondary me-2">Editar</a>
                                                <button onClick={() => openDeleteModal(note)} className="btn btn-sm btn-outline-danger">Eliminar</button>
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
                                    <h5 className="modal-title fw-bold">Eliminar nota permanentemente</h5>
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
                                            Esta accion es irreversible y eliminara la nota de forma permanente.
                                        </div>
                                    </div>
                                    <p className="mb-0 text-muted small">
                                        Si la nota está en uso dentro de product_notes, la eliminación será bloqueada por seguridad.
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
