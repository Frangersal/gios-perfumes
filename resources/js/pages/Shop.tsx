import React from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import ShopSidebar from '../layouts/Shop/ShopSidebar';
import ShopGrid from '../layouts/Shop/ShopGrid';

export default function Shop() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <PromoBar />

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-3">
                        <ShopSidebar />
                    </div>
                    <div className="col-md-9">
                        <ShopGrid />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
