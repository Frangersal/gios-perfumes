import React, { useMemo, useState } from 'react';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import CategoryHeader from '../layouts/Category/CategoryHeader';
import CategorySidebar from '../layouts/Category/CategorySidebar';
import CategoryGrid, { CategoryInfo } from '../layouts/Category/CategoryGrid';

import '../../css/pages/index.css';
import '../../css/pages/category.css';

export default function Category() {
    const [category, setCategory] = useState<CategoryInfo | null>(null);
    const [loaded, setLoaded] = useState(false);

    // El slug viene como segmento final de /categoria/{slug?}; si no hay, queda null.
    const slug = useMemo(() => {
        const segments = window.location.pathname.split('/').filter(Boolean);
        const idx = segments.indexOf('categoria');
        if (idx >= 0 && idx + 1 < segments.length) {
            return decodeURIComponent(segments[idx + 1]);
        }
        return null;
    }, []);

    const handleCategoryLoaded = (info: CategoryInfo | null) => {
        setCategory(info);
        setLoaded(true);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="grow gp-luxury">
                <CategoryHeader
                    categoryName={category?.name ?? null}
                    description={category?.description ?? null}
                    slug={slug}
                    loading={!loaded}
                />

                <section className="gp-cat-layout">
                    <CategorySidebar />
                    <CategoryGrid onCategoryLoaded={handleCategoryLoaded} />
                </section>
            </main>

            <Footer />
        </div>
    );
}