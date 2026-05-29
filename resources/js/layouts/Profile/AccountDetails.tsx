import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserForm {
    name: string;
    email: string;
    phone: string;
}

const EMPTY: UserForm = { name: '', email: '', phone: '' };

export default function AccountDetails() {
    const baseUrl = (document.getElementById('root')?.getAttribute('data-base-url') || '').replace(/\/$/, '');

    const [form, setForm] = useState<UserForm>(EMPTY);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    useEffect(() => {
        let cancelled = false;
        axios
            .get(`${baseUrl}/profile/account`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (cancelled) return;
                if (res.data?.ok && res.data.user) {
                    setForm({
                        name: res.data.user.name || '',
                        email: res.data.user.email || '',
                        phone: res.data.user.phone || '',
                    });
                } else {
                    setFeedback({ type: 'danger', message: 'No se pudieron cargar tus datos.' });
                }
            })
            .catch(() => {
                if (!cancelled) setFeedback({ type: 'danger', message: 'No se pudieron cargar tus datos.' });
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [baseUrl]);

    const handleChange = (field: keyof UserForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setFeedback(null);
        setErrors({});
        try {
            const res = await axios.put(`${baseUrl}/profile/account`, form);
            if (res.data?.ok) {
                setFeedback({ type: 'success', message: 'Datos actualizados correctamente.' });
                // Sincroniza el nombre en el data-user-name del root para próximas pantallas
                const root = document.getElementById('root');
                if (root && res.data.user?.name) {
                    root.setAttribute('data-user-name', res.data.user.name);
                }
            } else {
                setFeedback({ type: 'danger', message: 'No se pudo guardar.' });
            }
        } catch (err: any) {
            if (err?.response?.status === 422) {
                setErrors(err.response.data?.errors || {});
                setFeedback({ type: 'danger', message: 'Revisa los datos del formulario.' });
            } else {
                setFeedback({ type: 'danger', message: err?.response?.data?.message || 'Error al guardar.' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            <h3 className="fw-bold mb-4">Detalles de Cuenta</h3>

            {loading ? (
                <div className="text-center py-5 text-muted">
                    <div className="spinner-border text-dark mb-3" role="status">
                        <span className="visually-hidden">Cargando…</span>
                    </div>
                    <div>Cargando tus datos…</div>
                </div>
            ) : (
                <form className="mt-4" onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Nombre completo <span className="text-danger">*</span></label>
                        <input
                            type="text"
                            className={`form-control rounded-3 py-2 bg-light ${errors.name ? 'is-invalid' : ''}`}
                            value={form.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                            maxLength={255}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                    </div>

                    <div className="row g-4 mb-4">
                        <div className="col-md-7">
                            <label className="form-label fw-bold">Correo electrónico <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className={`form-control rounded-3 py-2 bg-light ${errors.email ? 'is-invalid' : ''}`}
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                                maxLength={255}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                        </div>
                        <div className="col-md-5">
                            <label className="form-label fw-bold">Teléfono</label>
                            <input
                                type="tel"
                                className={`form-control rounded-3 py-2 bg-light ${errors.phone ? 'is-invalid' : ''}`}
                                value={form.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                maxLength={30}
                                placeholder="(opcional)"
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone[0]}</div>}
                        </div>
                    </div>

                    {feedback && (
                        <div className={`alert alert-${feedback.type} rounded-3`} role="alert">
                            {feedback.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-dark py-3 px-5 rounded-pill fw-bold"
                        style={{ letterSpacing: '0.5px' }}
                        disabled={submitting}
                    >
                        {submitting && <span className="spinner-border spinner-border-sm me-2" role="status" />}
                        GUARDAR CAMBIOS
                    </button>
                </form>
            )}
        </div>
    );
}
