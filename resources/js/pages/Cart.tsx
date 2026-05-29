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

    const shipping = itemCount > 0 ? 0 : 0;
    const total = subtotal + shipping;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="container mt-5 mb-5">
                <h2 className="fw-bold mb-5 text-center">Carrito de Compras</h2>
                
                <div className="row g-5">
                    <div className="col-lg-7 col-xl-8">
                        <CartList
                            items={items}
                            onIncrease={handleIncrease}
                            onDecrease={handleDecrease}
                            onRemove={handleRemove}
                        />
                    </div>
                    <div className="col-lg-5 col-xl-4">
                        <CartSummary itemCount={itemCount} subtotal={subtotal} shipping={shipping} total={total} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
