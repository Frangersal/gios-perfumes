import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import BrandList from '../layouts/Brand/BrandList';

import '../../css/pages/index.css';
import '../../css/pages/brands.css';

export default function Brands() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="grow gp-luxury">
                <section className="gp-brands-hero">
                    <div className="gp-brands-hero__inner">
                        <span className="gp-eyebrow">Nuestras casas</span>
                        <h1 className="gp-brands-hero__title">
                            Las <em>marcas</em> que definen Gio's
                        </h1>
                        <span className="gp-divider" />
                        <p className="gp-brands-hero__lead">
                            Trabajamos exclusivamente con las casas perfumeras más reconocidas a nivel mundial
                            para traerte los aromas más selectos, seleccionados pieza por pieza.
                        </p>
                    </div>
                </section>

                <BrandList />
            </main>

            <Footer />
        </div>
    );
}
