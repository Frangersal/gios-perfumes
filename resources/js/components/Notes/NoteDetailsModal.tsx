import React, { useEffect } from 'react';

export interface NoteItem {
    id: number | string;
    name: string;
    slug: string;
    image?: string | null;
    description?: string | null;
}

interface NoteDetailsModalProps {
    note: NoteItem | null;
    onClose: () => void;
    baseUrl?: string;
}

export function normalizeNoteImageUrl(url?: string | null, baseUrl: string = ''): string {
    if (!url) return '';
    if (url.startsWith('blob:') || url.startsWith('data:') || /^https?:\/\//i.test(url)) {
        return url;
    }
    const normalizedBase = baseUrl.replace(/\/$/, '');
    const normalizedPath = url.startsWith('/') ? url : `/${url}`;
    return `${normalizedBase}${normalizedPath}`;
}

export default function NoteDetailsModal({ note, onClose, baseUrl = '' }: NoteDetailsModalProps) {
    useEffect(() => {
        if (!note) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKey);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = previousOverflow;
        };
    }, [note, onClose]);

    if (!note) return null;

    const imgUrl = normalizeNoteImageUrl(note.image, baseUrl);

    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content border-0 shadow rounded-4 overflow-hidden">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold">{note.name}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Cerrar"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-12 col-md-5">
                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light rounded-4 overflow-hidden"
                                        style={{ aspectRatio: '1 / 1' }}
                                    >
                                        {imgUrl ? (
                                            <img
                                                src={imgUrl}
                                                alt={note.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: '5rem' }}>🌺</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 col-md-7">
                                    <div
                                        className="text-uppercase text-muted small fw-semibold mb-2"
                                        style={{ letterSpacing: '1.5px' }}
                                    >
                                        Nota olfativa
                                    </div>
                                    <h3 className="fw-bold mb-3">{note.name}</h3>
                                    {note.description ? (
                                        <p className="text-muted mb-0" style={{ lineHeight: '1.8' }}>
                                            {note.description}
                                        </p>
                                    ) : (
                                        <p className="text-muted fst-italic mb-0">
                                            Sin descripción disponible para esta nota.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button type="button" className="btn btn-dark" onClick={onClose}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" onClick={onClose}></div>
        </>
    );
}
