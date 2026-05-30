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
        <section className="mb-5">
            <div className="row g-4">
                {items.map((item) => (
                    <div key={item.product_id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <WishlistCard
                            productId={item.product_id}
                            name={item.name}
                            brand={item.brand}
                            image={item.image}
                            currentPrice={item.current_price}
                            oldPrice={item.old_price}
                            onRemove={onRemove}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
