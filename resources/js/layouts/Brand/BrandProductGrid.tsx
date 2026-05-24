import React from 'react';
import Card from '../../components/Index/Card';

export default function BrandProductGrid() {
    return (
        <section className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Fragancias de la marca (12)</h4>
                <select className="form-select w-auto font-weight-bold" aria-label="Order by">
                    <option value="populares">Más Populares</option>
                    <option value="recientes">Más Recientes</option>
                    <option value="precio_desc">Precio: Alto a Bajo</option>
                    <option value="precio_asc">Precio: Bajo a Alto</option>
                </select>
            </div>

            <div className="row g-4">
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

            <div className="text-center mt-5">
                <button className="btn btn-outline-dark px-4">Cargar más productos</button>
            </div>
        </section>
    );
}
