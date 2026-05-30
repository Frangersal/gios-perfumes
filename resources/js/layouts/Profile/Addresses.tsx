import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Address {
    id: number;
    country: string;
    region: string;
    city: string;
    postal_code: string | null;
    address: string;
    type: string | null;
}

interface FormState {
    country: string;
    region: string;
    city: string;
    postal_code: string;
    address: string;
    type: string;
}

const EMPTY_FORM: FormState = {
    country: 'México',
    region: '',
    city: '',
    postal_code: '',
    address: '',
    type: '',
};

const MAX_ADDRESSES = 2;

const MEXICO_STATES = [
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Ciudad de México',
    'Coahuila',
    'Colima',
    'Durango',
    'Estado de México',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Michoacán',
    'Morelos',
    'Nayarit',
    'Nuevo León',
    'Oaxaca',
    'Puebla',
    'Querétaro',
    'Quintana Roo',
    'San Luis Potosí',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatán',
    'Zacatecas',
];

export default function Addresses() {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [creating, setCreating] = useState<boolean>(false);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadAddresses = () => {
        setLoading(true);
        axios
            .get(`${baseUrl}/profile/addresses`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (res.data?.ok) {
                    setAddresses(Array.isArray(res.data.addresses) ? res.data.addresses : []);
                } else {
                    setError('No se pudieron cargar las direcciones.');
                }
            })
            .catch(() => setError('No se pudieron cargar las direcciones.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        loadAddresses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (field: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const openCreate = () => {
        setCreating(true);
        setEditingId(null);
        setForm(EMPTY_FORM);
        setFormError(null);
    };

    const openEdit = (addr: Address) => {
        setEditingId(addr.id);
        setCreating(false);
        setForm({
            country: addr.country || 'México',
            region: addr.region || '',
            city: addr.city || '',
            postal_code: addr.postal_code || '',
            address: addr.address || '',
            type: addr.type || '',
        });
        setFormError(null);
    };

    const cancelForm = () => {
        setCreating(false);
        setEditingId(null);
        setForm(EMPTY_FORM);
        setFormError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.country.trim() || !form.region.trim() || !form.city.trim() || !form.address.trim()) {
            setFormError('Completa los campos requeridos.');
            return;
        }
        setSubmitting(true);
        setFormError(null);
        try {
            if (editingId !== null) {
                await axios.put(`${baseUrl}/profile/addresses/${editingId}`, form);
            } else {
                await axios.post(`${baseUrl}/profile/addresses`, form);
            }
            cancelForm();
            loadAddresses();
        } catch (err: any) {
            setFormError(err?.response?.data?.message || 'No se pudo guardar la dirección.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Eliminar esta dirección?')) return;
        try {
            await axios.delete(`${baseUrl}/profile/addresses/${id}`);
            if (editingId === id) cancelForm();
            loadAddresses();
        } catch {
            setError('No se pudo eliminar la dirección.');
        }
    };

    const canAddMore = addresses.length < MAX_ADDRESSES && !creating && editingId === null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="fw-bold mb-0">Direcciones</h3>
                <span className="text-muted small">
                    {addresses.length} / {MAX_ADDRESSES} direcciones
                </span>
            </div>
            <p className="text-muted mb-4 fs-6">
                Puedes guardar hasta {MAX_ADDRESSES} direcciones para usarlas al momento del pago.
            </p>

            {loading && (
                <div className="text-center py-5 text-muted">
                    <div className="spinner-border text-dark mb-3" role="status">
                        <span className="visually-hidden">Cargando…</span>
                    </div>
                    <div>Cargando direcciones…</div>
                </div>
            )}

            {!loading && error && (
                <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!loading && !error && (
                <>
                    <div className="row g-4 mb-3">
                        {addresses.map((addr) => {
                            const isEditing = editingId === addr.id;
                            return (
                                <div key={addr.id} className="col-md-6">
                                    <div className={`card border rounded-4 shadow-sm h-100 ${isEditing ? 'border-dark' : ''}`}>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="fw-bold mb-0">
                                                    {addr.type?.trim() ? addr.type : 'Dirección guardada'}
                                                </h5>
                                                {isEditing && <span className="badge bg-dark">Editando</span>}
                                            </div>
                                            <address className="text-muted mb-4">
                                                {addr.address}<br />
                                                {addr.city}, {addr.region}{addr.postal_code ? ` ${addr.postal_code}` : ''}<br />
                                                {addr.country}
                                            </address>
                                            <div className="d-flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm fw-bold rounded-pill px-3"
                                                    onClick={() => openEdit(addr)}
                                                    disabled={creating || (editingId !== null && editingId !== addr.id)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger btn-sm fw-bold rounded-pill px-3"
                                                    onClick={() => handleDelete(addr.id)}
                                                    disabled={submitting}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Slots vacíos hasta completar 2 */}
                        {Array.from({ length: Math.max(0, MAX_ADDRESSES - addresses.length) }).map((_, idx) => (
                            <div key={`empty-${idx}`} className="col-md-6">
                                <div
                                    className="card border border-2 rounded-4 h-100 d-flex align-items-center justify-content-center text-center"
                                    style={{ borderStyle: 'dashed', minHeight: 200 }}
                                >
                                    <div className="card-body d-flex flex-column align-items-center justify-content-center text-muted">
                                        <div className="display-6 mb-2">＋</div>
                                        <p className="mb-3">Espacio disponible para otra dirección</p>
                                        <button
                                            type="button"
                                            className="btn btn-dark rounded-pill px-4 fw-semibold"
                                            onClick={openCreate}
                                            disabled={creating || editingId !== null}
                                        >
                                            Agregar dirección
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {(creating || editingId !== null) && (
                        <div className="card border rounded-4 shadow-sm mt-3">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3">
                                    {editingId !== null ? 'Editar dirección' : 'Nueva dirección'}
                                </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-uppercase">Etiqueta</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Casa, Oficina…"
                                                value={form.type}
                                                onChange={(e) => handleChange('type', e.target.value)}
                                                maxLength={50}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold text-uppercase">País *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.country}
                                                onChange={(e) => handleChange('country', e.target.value)}
                                                required
                                                maxLength={100}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-semibold text-uppercase">Dirección *</label>
                                            <textarea
                                                className="form-control"
                                                rows={2}
                                                placeholder="Calle, número, colonia, referencias…"
                                                value={form.address}
                                                onChange={(e) => handleChange('address', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <label className="form-label small fw-semibold text-uppercase">Ciudad *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.city}
                                                onChange={(e) => handleChange('city', e.target.value)}
                                                required
                                                maxLength={100}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-semibold text-uppercase">Estado / Región *</label>
                                            <select
                                                className="form-select"
                                                value={form.region}
                                                onChange={(e) => handleChange('region', e.target.value)}
                                                required
                                            >
                                                <option value="">Selecciona un estado…</option>
                                                {MEXICO_STATES.map((state) => (
                                                    <option key={state} value={state}>{state}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="form-label small fw-semibold text-uppercase">Código postal</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={form.postal_code}
                                                onChange={(e) => handleChange('postal_code', e.target.value)}
                                                maxLength={20}
                                            />
                                        </div>
                                    </div>

                                    {formError && (
                                        <div className="alert alert-danger mt-3 mb-0" role="alert">{formError}</div>
                                    )}

                                    <div className="d-flex justify-content-end gap-2 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary rounded-pill px-4"
                                            onClick={cancelForm}
                                            disabled={submitting}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-dark rounded-pill px-4 fw-semibold"
                                            disabled={submitting}
                                        >
                                            {submitting && (
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            )}
                                            {editingId !== null ? 'Guardar cambios' : 'Guardar dirección'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {!canAddMore && addresses.length >= MAX_ADDRESSES && !creating && editingId === null && (
                        <p className="text-muted small mt-3 mb-0">
                            Alcanzaste el máximo de {MAX_ADDRESSES} direcciones. Elimina una para agregar otra.
                        </p>
                    )}
                </>
            )}
        </div>
    );
}
