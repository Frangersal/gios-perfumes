import React, { useState } from 'react';
import axios from 'axios';

export default function CheckoutForm() {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'oxxo' | 'transfer'>('card');
    const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | null>(null);
    const [sameAsShipping, setSameAsShipping] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

    const baseUrl = document.getElementById('root')?.getAttribute('data-base-url') || '';

    const handleConfirm = async () => {
        setFeedback(null);

        // Validaciones m\u00ednimas en cliente
        const requiredInfo = ['email', 'phone', 'firstName', 'lastName', 'address', 'zip', 'city', 'state'];
        const missing = requiredInfo.find((id) => {
            const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
            return !el || el.value.trim() === '';
        });
        if (missing) {
            setFeedback({ type: 'danger', message: 'Completa todos los campos de contacto y direcci\u00f3n.' });
            return;
        }
        if (!shippingMethod) {
            setFeedback({ type: 'danger', message: 'Selecciona un m\u00e9todo de env\u00edo.' });
            return;
        }
        const terms = document.getElementById('terms') as HTMLInputElement | null;
        if (!terms?.checked) {
            setFeedback({ type: 'danger', message: 'Debes aceptar los t\u00e9rminos y condiciones.' });
            return;
        }

        let storedItems: Array<{ product_variant_id: number; quantity: number }> = [];
        try {
            const raw = window.localStorage.getItem('gios_cart_items') || '[]';
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                storedItems = parsed.map((it: any) => ({
                    product_variant_id: Number(it.product_variant_id),
                    quantity: Number(it.quantity),
                }));
            }
        } catch {
            storedItems = [];
        }

        if (storedItems.length === 0) {
            setFeedback({ type: 'danger', message: 'Tu carrito est\u00e1 vac\u00edo.' });
            return;
        }

        const url = `${baseUrl.replace(/\/$/, '')}/checkout`;
        setSubmitting(true);
        try {
            const res = await axios.post(url, {
                items: storedItems,
                payment_method: paymentMethod,
                shipping_method: shippingMethod,
            });

            if (res.data?.ok) {
                // Limpiar carrito local
                window.localStorage.removeItem('gios_cart_items');
                window.localStorage.removeItem('gios_cart_id');

                setFeedback({
                    type: 'success',
                    message: `\u00a1Orden #${res.data.order_id} creada con \u00e9xito! Redirigiendo\u2026`,
                });

                setTimeout(() => {
                    window.location.href = `${baseUrl.replace(/\/$/, '')}/`;
                }, 1800);
            } else {
                setFeedback({ type: 'danger', message: res.data?.message || 'No se pudo crear la orden.' });
            }
        } catch (err: any) {
            const msg = err?.response?.data?.message || 'Error al procesar la orden. Intenta nuevamente.';
            setFeedback({ type: 'danger', message: msg });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="d-flex flex-column gap-5" noValidate style={{ scrollMarginTop: '12rem' }}>
            {/* 1. Contacto */}
            <section id="step-contact" data-step="contact" className="card border-0 shadow-sm" style={{ minHeight: '60vh' }}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge rounded-circle bg-dark text-white me-2 d-inline-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>1</span>
                        <h5 className="fw-bold mb-0">Contacto</h5>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-7">
                            <label htmlFor="email" className="form-label small fw-semibold text-uppercase text-muted">
                                Correo electrónico
                            </label>
                            <input type="email" className="form-control" id="email" placeholder="ejemplo@correo.com" required />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="phone" className="form-label small fw-semibold text-uppercase text-muted">
                                Teléfono
                            </label>
                            <input type="tel" className="form-control" id="phone" placeholder="55 1234 5678" required />
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="newsletter" />
                                <label className="form-check-label small text-muted" htmlFor="newsletter">
                                    Quiero recibir ofertas y novedades por correo
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Dirección de envío */}
            <section id="step-address" data-step="address" className="card border-0 shadow-sm" style={{ minHeight: '60vh' }}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge rounded-circle bg-dark text-white me-2 d-inline-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>2</span>
                        <h5 className="fw-bold mb-0">Dirección de envío</h5>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label small fw-semibold text-uppercase text-muted">Nombre</label>
                            <input type="text" className="form-control" id="firstName" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label small fw-semibold text-uppercase text-muted">Apellidos</label>
                            <input type="text" className="form-control" id="lastName" required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label small fw-semibold text-uppercase text-muted">Calle y número</label>
                            <input type="text" className="form-control" id="address" placeholder="Av. Reforma 123, Col. Centro" required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="address2" className="form-label small fw-semibold text-uppercase text-muted">
                                Interior / referencias <span className="text-muted fw-normal text-lowercase">(opcional)</span>
                            </label>
                            <input type="text" className="form-control" id="address2" placeholder="Depto, piso, entre calles…" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="zip" className="form-label small fw-semibold text-uppercase text-muted">Código postal</label>
                            <input type="text" className="form-control" id="zip" inputMode="numeric" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label small fw-semibold text-uppercase text-muted">Ciudad</label>
                            <input type="text" className="form-control" id="city" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label small fw-semibold text-uppercase text-muted">Estado</label>
                            <select className="form-select" id="state" defaultValue="" required>
                                <option value="" disabled>Selecciona…</option>
                                <option>Ciudad de México</option>
                                <option>Estado de México</option>
                                <option>Jalisco</option>
                                <option>Nuevo León</option>
                                <option>Querétaro</option>
                                <option>Puebla</option>
                                <option>Yucatán</option>
                                <option>Otro</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="billingSame"
                                    checked={sameAsShipping}
                                    onChange={(e) => setSameAsShipping(e.target.checked)}
                                />
                                <label className="form-check-label small" htmlFor="billingSame">
                                    Usar esta dirección también para facturación
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Método de envío */}
            <section id="step-shipping" data-step="shipping" className="card border-0 shadow-sm" style={{ minHeight: '50vh' }}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge rounded-circle bg-dark text-white me-2 d-inline-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>3</span>
                        <h5 className="fw-bold mb-0">Método de envío</h5>
                    </div>
                    <div className="list-group">
                        <label className={`list-group-item d-flex justify-content-between align-items-center ${shippingMethod === 'standard' ? 'border-dark' : ''}`}>
                            <div className="d-flex align-items-center">
                                <input
                                    className="form-check-input me-3 mt-0"
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'standard'}
                                    onChange={() => setShippingMethod('standard')}
                                />
                                <div>
                                    <div className="fw-semibold">Envío estándar</div>
                                    <small className="text-muted">3 a 5 días hábiles</small>
                                </div>
                            </div>
                            <span className="badge bg-success-subtle text-success-emphasis fw-semibold">Gratis</span>
                        </label>
                        <label className={`list-group-item d-flex justify-content-between align-items-center ${shippingMethod === 'express' ? 'border-dark' : ''}`}>
                            <div className="d-flex align-items-center">
                                <input
                                    className="form-check-input me-3 mt-0"
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === 'express'}
                                    onChange={() => setShippingMethod('express')}
                                />
                                <div>
                                    <div className="fw-semibold">Envío exprés</div>
                                    <small className="text-muted">24 a 48 horas</small>
                                </div>
                            </div>
                            <span className="fw-semibold">$199.00</span>
                        </label>
                    </div>
                </div>
            </section>

            {/* 4. Método de pago */}
            <section id="step-payment" data-step="payment" className="card border-0 shadow-sm" style={{ minHeight: '60vh' }}>
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                        <span className="badge rounded-circle bg-dark text-white me-2 d-inline-flex align-items-center justify-content-center" style={{ width: 28, height: 28 }}>4</span>
                        <h5 className="fw-bold mb-0">Método de pago</h5>
                    </div>

                    <div className="btn-group w-100 mb-3" role="group" aria-label="Método de pago">
                        {[
                            { id: 'card', label: 'Tarjeta' },
                            { id: 'paypal', label: 'PayPal' },
                            { id: 'oxxo', label: 'OXXO' },
                            { id: 'transfer', label: 'Transferencia' },
                        ].map((opt) => (
                            <React.Fragment key={opt.id}>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="paymentMethod"
                                    id={`pm-${opt.id}`}
                                    checked={paymentMethod === opt.id}
                                    onChange={() => setPaymentMethod(opt.id as typeof paymentMethod)}
                                />
                                <label className="btn btn-outline-dark fw-semibold" htmlFor={`pm-${opt.id}`}>
                                    {opt.label}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="cardName" className="form-label small fw-semibold text-uppercase text-muted">Nombre en la tarjeta</label>
                                <input type="text" className="form-control" id="cardName" placeholder="Como aparece en la tarjeta" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="cardNumber" className="form-label small fw-semibold text-uppercase text-muted">Número de tarjeta</label>
                                <input type="text" className="form-control" id="cardNumber" placeholder="1234 5678 9012 3456" inputMode="numeric" />
                            </div>
                            <div className="col-6 col-md-4">
                                <label htmlFor="cardExpiry" className="form-label small fw-semibold text-uppercase text-muted">Vence</label>
                                <input type="text" className="form-control" id="cardExpiry" placeholder="MM/AA" />
                            </div>
                            <div className="col-6 col-md-4">
                                <label htmlFor="cardCvc" className="form-label small fw-semibold text-uppercase text-muted">CVC</label>
                                <input type="text" className="form-control" id="cardCvc" placeholder="123" />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'paypal' && (
                        <div className="alert alert-light border mb-0 small">
                            Serás redirigido a <strong>PayPal</strong> para completar el pago de forma segura.
                        </div>
                    )}
                    {paymentMethod === 'oxxo' && (
                        <div className="alert alert-light border mb-0 small">
                            Generaremos una <strong>ficha OXXO</strong> al confirmar tu pedido. Tendrás hasta 72 horas para pagar.
                        </div>
                    )}
                    {paymentMethod === 'transfer' && (
                        <div className="alert alert-light border mb-0 small">
                            Recibirás los <strong>datos bancarios</strong> por correo para realizar tu transferencia.
                        </div>
                    )}

                    <hr className="my-4" />

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="terms" required />
                        <label className="form-check-label small text-muted" htmlFor="terms">
                            He leído y acepto los <a href="#" className="text-decoration-none">términos y condiciones</a> y la <a href="#" className="text-decoration-none">política de privacidad</a>.
                        </label>
                    </div>

                    {feedback && (
                        <div className={`alert alert-${feedback.type} small`} role="alert">
                            {feedback.message}
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn btn-dark w-100 py-3 text-uppercase fw-bold"
                        onClick={handleConfirm}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                                Procesando…
                            </>
                        ) : (
                            'Confirmar y pagar'
                        )}
                    </button>
                    <p className="text-center text-muted small mb-0 mt-3">
                        🔒 Conexión cifrada · Tus datos están protegidos
                    </p>
                </div>
            </section>
        </form>
    );
}

