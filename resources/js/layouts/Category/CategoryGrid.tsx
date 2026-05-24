import React from 'react';
import Card from '../../components/Index/Card';
import CategorySort from './CategorySort';
import CategoryPagination from './CategoryPagination';

export default function CategoryGrid() {
    return (
        <section>
            <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
                <span className="text-muted">Mostrando 1-12 de 45 resultados</span>
                <CategorySort />
            </div>

            <div className="row g-4 mb-5">
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

            <div className="pb-5">
                <CategoryPagination />
            </div>
        </section>
    );
}