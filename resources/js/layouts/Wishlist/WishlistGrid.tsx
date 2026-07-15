import React from 'react';
import WishlistCard from '../../components/Wishlist/WishlistCard';

export interface WishlistGridItem {
    product_id: number;
    name: string;
    brand: string;
    image: string;
    current_price: string;
    old_price?: string;
}

interface WishlistGridProps {
    items: WishlistGridItem[];
    onRemove: (productId: number) => void;
}

export default function WishlistGrid({ items, onRemove }: WishlistGridProps) {
    return (
        <div className="gp-pgrid">
            {items.map((item) => (
                <WishlistCard
                    key={item.product_id}
                    productId={item.product_id}
                    name={item.name}
                    brand={item.brand}
                    image={item.image}
                    currentPrice={item.current_price}
                    oldPrice={item.old_price}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}
