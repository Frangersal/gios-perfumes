import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import BrandList from '../layouts/Brand/BrandList';

export default function Brands() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <main className="container mt-5">
                <BrandList />
            </main>

            <Footer />
        </div>
    );
}
