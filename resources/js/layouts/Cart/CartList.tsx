import React from 'react';
import CartItem from '../../components/Cart/CartItem';

export default function CartList() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-4">
                <h4 className="fw-bold mb-0">Tus Productos</h4>
                <p className="mb-0 text-muted">2 artículos</p>
            </div>
            
            <CartItem />
            <CartItem />
        </div>
    );
}
