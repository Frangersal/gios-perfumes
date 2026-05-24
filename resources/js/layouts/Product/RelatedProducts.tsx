import React from 'react';
import Card from '../../components/Index/Card';

export default function RelatedProducts() {
    return (
        <section className="mt-5 pt-5 mb-5 border-top">
            <h3 className="mb-4 text-center fw-bold">También te podría gustar</h3>
            <div className="row g-4 justify-content-center">
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <Card />
                </div>
                <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                    <Card />
                </div>
            </div>
        </section>
    );
}
