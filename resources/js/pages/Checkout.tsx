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

export default function Checkout() {
    const [items, setItems] = useState<CartStorageItem[]>([]);

    useEffect(() => {
        try {
            const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            setItems(Array.isArray(parsed) ? parsed : []);
        } catch {
            setItems([]);
        }
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
                <ul className="nav nav-pills nav-fill bg-white border rounded-3 p-2 mb-4 shadow-sm">
                    <li className="nav-item">
                        <span className="nav-link active bg-dark text-white d-flex align-items-center justify-content-center gap-2">
                            <span className="badge rounded-pill bg-white text-dark">1</span>
                            <span className="d-none d-sm-inline">Información</span>
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link text-muted d-flex align-items-center justify-content-center gap-2">
                            <span className="badge rounded-pill bg-light text-muted border">2</span>
                            <span className="d-none d-sm-inline">Pago</span>
                        </span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link text-muted d-flex align-items-center justify-content-center gap-2">
                            <span className="badge rounded-pill bg-light text-muted border">3</span>
                            <span className="d-none d-sm-inline">Confirmación</span>
                        </span>
                    </li>
                </ul>

                <div className="row g-4 flex-lg-row-reverse">
                    <div className="col-lg-5">
                        <div className="sticky-lg-top" style={{ top: '5.5rem' }}>
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
