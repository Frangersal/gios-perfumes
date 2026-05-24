import React from 'react';
import BrandCard from '../../components/Brand/BrandCard';

export default function BrandList() {
    return (
        <section className="mb-5 py-4">
            <div className="text-center mb-5">
                <h1 className="fw-bold mb-3">Nuestras Marcas</h1>
                <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Trabajamos exclusivamente con las casas perfumeras más reconocidas a nivel mundial para traerte los aromas más selectos.
                </p>
            </div>

            <div className="row g-4">
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                    <BrandCard />
                </div>
            </div>
        </section>
    );
}
