import React from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import PromoBar from '../layouts/Index/PromoBar';
import Footer from '../layouts/Footer';

// Nueva propuesta de diseño "luxury" para la home
import '../../css/pages/index.css';
import HeroSection from '../layouts/Index/luxury/HeroSection';
import ValueProps from '../layouts/Index/luxury/ValueProps';
import FeaturedCategories from '../layouts/Index/luxury/FeaturedCategories';
import NewArrivals from '../layouts/Index/luxury/NewArrivals';
import EditorialBanner from '../layouts/Index/luxury/EditorialBanner';
import NotesPyramid from '../layouts/Index/luxury/NotesPyramid';
import BrandsMarquee from '../layouts/Index/luxury/BrandsMarquee';
import Testimonials from '../layouts/Index/luxury/Testimonials';
import NewsletterLuxury from '../layouts/Index/luxury/NewsletterLuxury';

export default function Index() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="grow gp-luxury">
                <HeroSection />
                <ValueProps />
                <FeaturedCategories />
                <NewArrivals />
                <EditorialBanner />
                <NotesPyramid />
                <BrandsMarquee />
                <Testimonials />
                <NewsletterLuxury />
            </main>

            <Footer />
        </div>
    );
}