import React from 'react';
import Card from '../../components/Index/Card';
import ShopSort from './ShopSort';
import ShopPagination from './ShopPagination';

export default function ShopGrid() {
    return (
        <section>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Cátalogo de Perfumes</h2>
                <ShopSort />
            </div>

            <div className="row g-4">
                {/* Simulated Grid of Products */}
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-4 d-flex justify-content-center">
                    <Card />
                </div>
            </div>

            <div className="mt-5">
                <ShopPagination />
            </div>
        </section>
    );
}
