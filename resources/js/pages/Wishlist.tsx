import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import SearchBar from '../layouts/SearchBar';
import Footer from '../layouts/Footer';
import PromoBar from '../layouts/Index/PromoBar';
import WishlistGrid, { WishlistGridItem } from '../layouts/Wishlist/WishlistGrid';
import WishlistEmpty from '../layouts/Wishlist/WishlistEmpty';

import '../../css/pages/index.css';
import '../../css/pages/wishlist.css';

const WISHLIST_KEY = 'gios_wishlist_items';

const readLocal = (): WishlistGridItem[] => {
    try {
        const raw = window.localStorage.getItem(WISHLIST_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const writeLocal = (items: WishlistGridItem[]) => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('wishlist:changed'));
};

export default function Wishlist() {
    const root = document.getElementById('root');
    const baseUrl = (root?.getAttribute('data-base-url') || '').replace(/\/$/, '');
    const userRole = root?.getAttribute('data-user-role') || '';
    const isAuthed = userRole.trim() !== '';

    const [items, setItems] = useState<WishlistGridItem[]>(() => readLocal());

    // Mantener sincronizado con cambios desde otras tarjetas
    useEffect(() => {
        const handle = () => setItems(readLocal());
        window.addEventListener('wishlist:changed', handle);
        return () => window.removeEventListener('wishlist:changed', handle);
    }, []);

    // Si el usuario está autenticado, traemos la wishlist real del backend y la fusionamos con localStorage
    useEffect(() => {
        if (!isAuthed) return;
        let cancelled = false;

        axios
            .get(`${baseUrl}/wishlist`, { headers: { Accept: 'application/json' } })
            .then((res) => {
                if (cancelled || !res.data?.ok) return;
                const serverItems = Array.isArray(res.data.items) ? res.data.items : [];
                const local = readLocal();
                // Merge: usamos los datos enriquecidos del local cuando existan; en caso contrario armamos uno mínimo.
                const merged: WishlistGridItem[] = serverItems.map((p: any) => {
                    const cached = local.find((it) => it.product_id === p.id);
                    if (cached) return cached;
                    const firstImage = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
                    const imagePath = firstImage?.path || firstImage?.url || '';
                    const image = imagePath
                        ? (imagePath.startsWith('http') ? imagePath : `${baseUrl}/storage/${imagePath.replace(/^\/+/, '')}`)
                        : '';
                    const price = Number(p.price ?? 0);
                    return {
                        product_id: p.id,
                        name: p.name ?? 'Perfume',
                        brand: p.brand?.name ?? '',
                        image,
                        current_price: price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }),
                    };
                });
                writeLocal(merged);
                setItems(merged);
            })
            .catch(() => {
                /* dejamos el localStorage como verdad */
            });

        return () => {
            cancelled = true;
        };
    }, [isAuthed, baseUrl]);

    const handleRemove = async (productId: number) => {
        const next = items.filter((it) => it.product_id !== productId);
        writeLocal(next);
        setItems(next);

        if (isAuthed) {
            try {
                await axios.delete(`${baseUrl}/wishlist/${productId}`);
            } catch (err) {
                console.warn('No se pudo eliminar de la wishlist en el servidor', err);
            }
        }
    };

    const hasItems = items.length > 0;

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <SearchBar />
            <PromoBar />

            <main className="grow gp-luxury">
                <section className="gp-wishlist-hero">
                    <div className="gp-wishlist-hero__inner">
                        <span className="gp-eyebrow">Mi colección</span>
                        <h1 className="gp-wishlist-hero__title">
                            Tu <em>wishlist</em> de fragancias
                        </h1>
                        <span className="gp-divider" />
                        <p className="gp-subtitle" style={{ marginTop: '1.25rem', color: 'rgba(247, 241, 230, 0.78)' }}>
                            Guarda las piezas que despierten tu memoria olfativa y vuelve a ellas cuando estés listo para llevarlas a casa.
                        </p>
                        <span className="gp-wishlist-hero__count">
                            {hasItems
                                ? `${items.length} ${items.length === 1 ? 'perfume guardado' : 'perfumes guardados'}`
                                : 'Sin perfumes guardados'}
                        </span>
                    </div>
                </section>

                <section className="gp-wishlist-section">
                    {hasItems ? <WishlistGrid items={items} onRemove={handleRemove} /> : <WishlistEmpty />}
                </section>
            </main>

            <Footer />
        </div>
    );
}
