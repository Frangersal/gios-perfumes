import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import CategoryHeader from '../layouts/Category/CategoryHeader';
import CategorySidebar from '../layouts/Category/CategorySidebar';
import CategoryGrid from '../layouts/Category/CategoryGrid';

export default function Category() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <CategoryHeader />

            <main className="container flex-grow-1">
                <div className="row">
                    <div className="col-md-3">
                        <CategorySidebar />
                    </div>
                    <div className="col-md-9">
                        <CategoryGrid />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}