import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import BrandHeader from '../layouts/Brand/BrandHeader';
import BrandProductGrid from '../layouts/Brand/BrandProductGrid';

export default function BrandDetail() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <div className="flex-grow-1">
                <BrandHeader />
                
                <main className="container">
                    <BrandProductGrid />
                </main>
            </div>

            <Footer />
        </div>
    );
}
