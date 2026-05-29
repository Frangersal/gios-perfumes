import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import CartList from '../layouts/Cart/CartList';
import CartSummary from '../layouts/Cart/CartSummary';

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

export default function Cart() {
    const [items, setItems] = useState<CartStorageItem[]>([]);

    useEffect(() => {
        try {
            const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
            setItems(Array.isArray(parsed) ? parsed : []);
        } catch {
            setItems([]);
        }
    }, []);

    const persistItems = (nextItems: CartStorageItem[]) => {
        setItems(nextItems);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    };

    const handleIncrease = (variantId: number) => {
        const nextItems = items.map((item) =>
            item.product_variant_id === variantId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        persistItems(nextItems);
    };

    const handleDecrease = (variantId: number) => {
        const nextItems = items
            .map((item) =>
                item.product_variant_id === variantId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            );
        persistItems(nextItems);
    };

    const handleRemove = (variantId: number) => {
        const nextItems = items.filter((item) => item.product_variant_id !== variantId);
        persistItems(nextItems);
    };

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0)), 0),
        [items]
    );

    const total = subtotal;

    const handleClearCart = () => {
        if (items.length === 0) return;
        if (window.confirm('¿Vaciar todo el carrito?')) {
            persistItems([]);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100 bg-body-tertiary">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="container my-5">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-3">
                    <ol className="breadcrumb small mb-0">
                        <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Inicio</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Carrito</li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 gap-3">
                    <div>
                        <h1 className="fw-bold mb-1">
                            Carrito de compras
                            {itemCount > 0 && (
                                <span className="badge bg-dark ms-2 align-middle fs-6">{itemCount}</span>
                            )}
                        </h1>
                        <p className="text-muted mb-0">Revisa tus productos antes de continuar con el pago.</p>
                    </div>
                    {items.length > 0 && (
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={handleClearCart}
                        >
                            <i className="bi bi-trash3 me-1"></i> Vaciar carrito
                        </button>
                    )}
                </div>

                <div className="row g-4">
                    <div className="col-lg-7 col-xl-8">
                        <CartList
                            items={items}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove}
                        />
                    </div>
                    <div className="col-lg-5 col-xl-4">
                        <div className="sticky-lg-top" style={{ top: '90px' }}>
                            <CartSummary itemCount={itemCount} subtotal={subtotal} total={total} />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
