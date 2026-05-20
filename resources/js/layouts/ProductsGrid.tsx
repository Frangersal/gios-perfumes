import React from 'react';
import Card from '../components/Card';

export default function ProductsGrid() {
    return (
        <section className="mb-5">
            <h3 className="text-center mb-4">Destacados</h3>
            <div className="d-flex flex-wrap justify-content-center gap-4">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </section>
    );
}