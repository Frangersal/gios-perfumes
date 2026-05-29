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

    return (
        <div>
            <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-4">
                <h4 className="fw-bold mb-0">Tus Productos</h4>
                <p className="mb-0 text-muted">{totalItems} artículo{totalItems === 1 ? '' : 's'}</p>
            </div>

            {items.length === 0 ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body py-5 text-center text-muted">
                        Tu carrito está vacío. Agrega productos desde la página de producto.
                    </div>
                </div>
            ) : (
                items.map((item) => (
                    <CartItem
                        key={item.product_variant_id}
                        productName={item.product_name}
                        variantVolume={item.variant_volume}
                        imageUrl={item.image_url}
                        unitPrice={Number(item.price || 0)}
                        quantity={Number(item.quantity || 1)}
                        onIncrease={() => onIncrease(item.product_variant_id)}
                        onDecrease={() => onDecrease(item.product_variant_id)}
                        onRemove={() => onRemove(item.product_variant_id)}
                    />
                ))
            )}
        </div>
    );
}
