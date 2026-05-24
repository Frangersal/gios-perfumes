import React from 'react';
import WishlistCard from '../../components/Wishlist/WishlistCard';

export default function WishlistGrid() {
    return (
        <section className="mb-5">
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <WishlistCard />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <WishlistCard />
                </div>
                <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <WishlistCard />
                </div>
            </div>
        </section>
    );
}