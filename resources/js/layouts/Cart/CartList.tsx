import React from 'react';
import CartItem from '../../components/Cart/CartItem';

interface CartStorageItem {
    product_id: number;
    product_name: string;
    product_variant_id: number;
    variant_volume: string;
    price: number;
    quantity: number;
    image_url?: string;
}

interface CartListProps {
    items: CartStorageItem[];
    onIncrease: (variantId: number) => void;
    onDecrease: (variantId: number) => void;
    onRemove: (variantId: number) => void;
}

export default function CartList({ items, onIncrease, onDecrease, onRemove }: CartListProps) {
    const totalItems = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    if (items.length === 0) {
        return (
            <div className="card border-0 shadow-sm">
                <div className="card-body py-5 text-center">
                    <div className="display-3 mb-3">🛒</div>
                    <h4 className="fw-bold mb-2">Tu carrito está vacío</h4>
                    <p className="text-muted mb-4">Descubre nuestras fragancias y agrega tus favoritas.</p>
                    <a href="/shop" className="btn btn-dark px-4 fw-semibold">Ir a la tienda</a>
                </div>
            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                <h5 className="fw-bold mb-0">Tus productos</h5>
                <span className="badge bg-light text-dark border">{totalItems} artículo{totalItems === 1 ? '' : 's'}</span>
            </div>
            <ul className="list-group list-group-flush">
                {items.map((item) => (
                    <li key={item.product_variant_id} className="list-group-item p-3">
                        <CartItem
                            productName={item.product_name}
                            variantVolume={item.variant_volume}
                            imageUrl={item.image_url}
                            unitPrice={Number(item.price || 0)}
                            quantity={Number(item.quantity || 1)}
                            onIncrease={() => onIncrease(item.product_variant_id)}
                            onDecrease={() => onDecrease(item.product_variant_id)}
                            onRemove={() => onRemove(item.product_variant_id)}
                        />
                    </li>
                ))}
            </ul>
            <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-3">
                <a href="/shop" className="text-decoration-none text-muted small">
                    ← Seguir comprando
                </a>
                <span className="text-muted small">Los precios incluyen IVA</span>
            </div>
        </div>
    );
}
