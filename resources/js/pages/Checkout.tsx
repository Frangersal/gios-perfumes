import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import CheckoutForm from '../layouts/Checkout/CheckoutForm';
import CheckoutSummary from '../layouts/Checkout/CheckoutSummary';

interface CartStorageItem {
    product_id: number;
    product_name: string;
    product_variant_id: number;
    variant_volume: string;
    price: number;
    quantity: number;
    image_url?: string;
}

const STORAGE_KEY = 'gios_cart_items';

type StepKey = 'contact' | 'address' | 'shipping' | 'payment';

const STEPS: { key: StepKey; label: string }[] = [
    { key: 'contact', label: 'Contacto' },
    { key: 'address', label: 'Dirección' },
    { key: 'shipping', label: 'Envío' },
    { key: 'payment', label: 'Pago' },
];

export default function Checkout() {
    const [items, setItems] = useState<CartStorageItem[]>([]);
    const [activeStep, setActiveStep] = useState<StepKey>('contact');
    const [completedSteps, setCompletedSteps] = useState<Record<StepKey, boolean>>({
        contact: false,
        address: false,
        shipping: false,
        payment: false,
    });

    useEffect(() => {
        try {
            const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            setItems(Array.isArray(parsed) ? parsed : []);
        } catch {
            setItems([]);
        }
    }, []);

    // Observa las secciones del formulario y resalta el paso activo según el scroll
    useEffect(() => {
        const computeActive = () => {
            const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-step]'));
            if (sections.length === 0) return;

            // Si llegamos cerca del fondo, forzamos el último paso (Pago)
            const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
            if (nearBottom) {
                setActiveStep('payment');
                return;
            }

            // El paso activo es la última sección cuyo top ya cruzó la línea de activación
            const triggerY = 200; // px desde el top del viewport
            let current: StepKey = 'contact';
            for (const sec of sections) {
                const top = sec.getBoundingClientRect().top;
                if (top <= triggerY) {
                    const step = sec.getAttribute('data-step') as StepKey | null;
                    if (step) current = step;
                } else {
                    break;
                }
            }
            setActiveStep(current);
        };

        computeActive();
        window.addEventListener('scroll', computeActive, { passive: true });
        window.addEventListener('resize', computeActive);
        return () => {
            window.removeEventListener('scroll', computeActive);
            window.removeEventListener('resize', computeActive);
        };
    }, []);

    // Valida cada paso revisando que sus inputs requeridos estén llenos
    useEffect(() => {
        const checkAll = () => {
            const next: Record<StepKey, boolean> = {
                contact: false,
                address: false,
                shipping: false,
                payment: false,
            };

            // 1. Contacto
            next.contact = ['email', 'phone'].every((id) => {
                const el = document.getElementById(id) as HTMLInputElement | null;
                return !!el && el.value.trim() !== '';
            });

            // 2. Dirección
            next.address = ['firstName', 'lastName', 'address', 'zip', 'city', 'state'].every((id) => {
                const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
                return !!el && el.value.trim() !== '';
            });

            // 3. Método de envío seleccionado
            next.shipping = !!document.querySelector('input[name="shipping"]:checked');

            // 4. Pago + términos
            const cardChecked = (document.getElementById('pm-card') as HTMLInputElement | null)?.checked;
            let paymentFieldsOk = false;
            if (cardChecked) {
                paymentFieldsOk = ['cardName', 'cardNumber', 'cardExpiry', 'cardCvc'].every((id) => {
                    const el = document.getElementById(id) as HTMLInputElement | null;
                    return !!el && el.value.trim() !== '';
                });
            } else {
                paymentFieldsOk = !!document.querySelector('input[name="paymentMethod"]:checked');
            }
            const termsOk = !!(document.getElementById('terms') as HTMLInputElement | null)?.checked;
            next.payment = paymentFieldsOk && termsOk;

            setCompletedSteps((prev) => {
                if (
                    prev.contact === next.contact &&
                    prev.address === next.address &&
                    prev.shipping === next.shipping &&
                    prev.payment === next.payment
                ) {
                    return prev;
                }
                return next;
            });
        };

        // Listeners globales en document (capturan inputs sin importar cuándo se monten)
        document.addEventListener('input', checkAll);
        document.addEventListener('change', checkAll);
        checkAll();

        return () => {
            document.removeEventListener('input', checkAll);
            document.removeEventListener('change', checkAll);
        };
    }, []);

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
        [items]
    );

    const total = subtotal;

    const handleStepClick = (key: StepKey) => {
        const targets: Record<StepKey, string> = {
            contact: 'step-contact',
            address: 'step-address',
            shipping: 'step-shipping',
            payment: 'step-payment',
        };
        const el = document.getElementById(targets[key]);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            <Navbar />
            <SearchBar />

            <main className="container py-4 py-md-5 grow">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb small mb-0">
                        <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Inicio</a></li>
                        <li className="breadcrumb-item"><a href="/cart" className="text-decoration-none text-muted">Carrito</a></li>
                        <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">Checkout</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
                    <div>
                        <h1 className="h2 fw-bold mb-1">Finalizar compra</h1>
                        <p className="text-muted mb-0">
                            Completa tus datos para procesar tu pedido de forma segura.
                        </p>
                    </div>
                    <a href="/cart" className="btn btn-outline-dark btn-sm">
                        &larr; Volver al carrito
                    </a>
                </div>

                {/* Pasos */}
                <div className="sticky-top bg-body-tertiary py-2 mb-4" style={{ top: '4rem', zIndex: 1020 }}>
                    <ul className="nav nav-pills nav-fill bg-white border rounded-3 p-2 shadow-sm mb-2">
                        {STEPS.map((step, idx) => {
                            const isActive = step.key === activeStep;
                            const isDone = completedSteps[step.key];
                            return (
                                <li className="nav-item" key={step.key}>
                                    <button
                                        type="button"
                                        onClick={() => handleStepClick(step.key)}
                                        className={`nav-link w-100 border-0 d-flex align-items-center justify-content-center gap-2 ${
                                            isActive
                                                ? 'active bg-dark text-white'
                                                : isDone
                                                    ? 'text-dark'
                                                    : 'text-muted'
                                        }`}
                                    >
                                        <span
                                            className={`badge rounded-pill d-inline-flex align-items-center justify-content-center ${
                                                isDone
                                                    ? 'bg-success text-white'
                                                    : isActive
                                                        ? 'bg-white text-dark'
                                                        : 'bg-light text-muted border'
                                            }`}
                                            style={{ width: 24, height: 24 }}
                                        >
                                            {isDone ? '✓' : idx + 1}
                                        </span>
                                        <span className="d-none d-sm-inline fw-semibold">{step.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {/* Barra de progreso */}
                    <div className="progress" style={{ height: '4px' }}>
                        <div
                            className="progress-bar bg-dark"
                            role="progressbar"
                            style={{
                                width: `${(Object.values(completedSteps).filter(Boolean).length / STEPS.length) * 100}%`,
                                transition: 'width 0.4s ease',
                            }}
                            aria-valuenow={Object.values(completedSteps).filter(Boolean).length}
                            aria-valuemin={0}
                            aria-valuemax={STEPS.length}
                        />
                    </div>
                </div>

                <div className="row g-4 flex-lg-row-reverse">
                    <div className="col-lg-5">
                        <div className="sticky-lg-top" style={{ top: '10rem' }}>
                            <CheckoutSummary items={items} itemCount={itemCount} subtotal={subtotal} total={total} />
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <CheckoutForm />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
