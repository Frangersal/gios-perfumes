import React, { useEffect, useRef, useState } from 'react';
import '../../css/layouts/navbar.css';

interface NavLink {
    label: string;
    href: string;
    accent?: boolean;
}

const CART_KEY = 'gios_cart_items';
const WISHLIST_KEY = 'gios_wishlist_items';

const readCount = (key: string): number => {
    try {
        const raw = window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return 0;
        if (key === CART_KEY) {
            return parsed.reduce((acc: number, it: { quantity?: number }) => {
                const q = Number(it?.quantity || 0);
                return acc + (q > 0 ? q : 1);
            }, 0);
        }
        return parsed.length;
    } catch {
        return 0;
    }
};

export default function Navbar() {
    const root = document.getElementById('root');
    const baseUrl = root?.getAttribute('data-base-url') || '';
    const userName = root?.getAttribute('data-user-name') || '';
    const userRole = root?.getAttribute('data-user-role') || '';
    const isAuthed = userRole.trim() !== '';

    const currentPath =
        typeof window !== 'undefined'
            ? window.location.pathname.replace(baseUrl.replace(/^https?:\/\/[^/]+/i, ''), '') || '/'
            : '/';

    const links: NavLink[] = [
        { label: 'Mujer',     href: `${baseUrl}/categoria/mujer` },
        { label: 'Hombre',    href: `${baseUrl}/categoria/hombre` },
        { label: 'Marcas',    href: `${baseUrl}/marcas` },
        { label: 'Novedades', href: `${baseUrl}/shop?sort=newest` },
        { label: 'Ofertas',   href: `${baseUrl}/shop?oferta=1`, accent: true },
        { label: 'Contacto',  href: `${baseUrl}/contact` },
    ];

    const [scrolled, setScrolled]   = useState(false);
    const [menuOpen, setMenuOpen]   = useState(false);
    const [userOpen, setUserOpen]   = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishCount, setWishCount] = useState(0);

    const userRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    useEffect(() => {
        const refresh = () => {
            setCartCount(readCount(CART_KEY));
            setWishCount(readCount(WISHLIST_KEY));
        };
        refresh();

        const handleStorage = (e: StorageEvent) => {
            if (e.key === CART_KEY || e.key === WISHLIST_KEY || e.key === null) refresh();
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('wishlist:changed', refresh as EventListener);
        window.addEventListener('cart:changed', refresh as EventListener);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('wishlist:changed', refresh as EventListener);
            window.removeEventListener('cart:changed', refresh as EventListener);
        };
    }, []);

    useEffect(() => {
        if (!userOpen) return;
        const onClick = (e: MouseEvent) => {
            if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, [userOpen]);

    const linkIsActive = (href: string): boolean => {
        try {
            const url = new URL(href, window.location.origin);
            if (url.pathname === '/' || url.pathname === '') return currentPath === '/';
            return currentPath.startsWith(url.pathname);
        } catch {
            return false;
        }
    };

    return (
        <>
            <nav className={`gp-nav${scrolled ? ' is-scrolled' : ''}`} aria-label="Principal">
                <div className="gp-nav__inner">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <a className="gp-nav__brand" href={`${baseUrl}/`}>
                            Gio's <em>Perfumes</em>
                            <span className="gp-nav__brand-tag">Maison de Parfum</span>
                        </a>
                    </div>

                    <ul className="gp-nav__links">
                        {links.map((l) => (
                            <li key={l.label}>
                                <a
                                    href={l.href}
                                    className={`gp-nav__link${l.accent ? ' gp-nav__link--accent' : ''}${
                                        linkIsActive(l.href) ? ' is-active' : ''
                                    }`}
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="gp-nav__actions">
                        <a
                            className="gp-nav__icon-btn"
                            href={`${baseUrl}/shop`}
                            aria-label="Buscar"
                            title="Buscar"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="11" cy="11" r="7" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </a>

                        <a
                            className="gp-nav__icon-btn"
                            href={`${baseUrl}/wishlist`}
                            aria-label="Lista de deseos"
                            title="Lista de deseos"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {wishCount > 0 && (
                                <span className="gp-nav__badge" aria-label={`${wishCount} en tu lista`}>
                                    {wishCount > 99 ? '99+' : wishCount}
                                </span>
                            )}
                        </a>

                        <a
                            className="gp-nav__icon-btn"
                            href={`${baseUrl}/cart`}
                            aria-label="Carrito"
                            title="Carrito"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 0 1-8 0" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="gp-nav__badge" aria-label={`${cartCount} en tu carrito`}>
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </a>

                        <div className={`gp-nav__user${userOpen ? ' is-open' : ''}`} ref={userRef}>
                            <button
                                type="button"
                                className="gp-nav__icon-btn"
                                aria-haspopup="menu"
                                aria-expanded={userOpen}
                                aria-label="Cuenta"
                                title="Cuenta"
                                onClick={() => setUserOpen((v) => !v)}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </button>

                            <div className="gp-nav__user-menu" role="menu">
                                {isAuthed ? (
                                    <>
                                        <div className="gp-nav__user-head">
                                            <strong>{userName || 'Bienvenida'}</strong>
                                            <span>{userRole}</span>
                                        </div>
                                        <a href={`${baseUrl}/profile`}>Mi perfil</a>
                                        <a href={`${baseUrl}/profile?tab=orders`}>Mis pedidos</a>
                                        <a href={`${baseUrl}/wishlist`}>Lista de deseos</a>
                                        {userRole.toLowerCase() === 'admin' && (
                                            <a href={`${baseUrl}/admin`}>Panel admin</a>
                                        )}
                                        <a href={`${baseUrl}/logout`}>Cerrar sesión</a>
                                    </>
                                ) : (
                                    <>
                                        <div className="gp-nav__user-head">
                                            <strong>Bienvenido</strong>
                                            <span>Tu cuenta Gio's</span>
                                        </div>
                                        <a href={`${baseUrl}/login`}>Iniciar sesión</a>
                                        <a href={`${baseUrl}/register`}>Crear cuenta</a>
                                        <a href={`${baseUrl}/wishlist`}>Lista de deseos</a>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            className={`gp-nav__burger${menuOpen ? ' is-open' : ''}`}
                            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`gp-nav__backdrop${menuOpen ? ' is-open' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            <aside className={`gp-nav gp-nav__drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
                <div className="gp-nav__drawer-head">
                    <a className="gp-nav__brand" href={`${baseUrl}/`}>
                        Gio's <em>Perfumes</em>
                    </a>
                    <button
                        type="button"
                        className="gp-nav__icon-btn"
                        aria-label="Cerrar menú"
                        onClick={() => setMenuOpen(false)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <ul>
                    {links.map((l) => (
                        <li key={l.label}>
                            <a
                                className={`gp-nav__link${l.accent ? ' gp-nav__link--accent' : ''}`}
                                href={l.href}
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="gp-nav__drawer-foot">
                    {isAuthed ? (
                        <>
                            <a href={`${baseUrl}/profile`}>Mi cuenta</a>
                            <a href={`${baseUrl}/logout`}>Cerrar sesión</a>
                        </>
                    ) : (
                        <>
                            <a href={`${baseUrl}/login`}>Iniciar sesión</a>
                            <a className="gp-nav__drawer-cta" href={`${baseUrl}/register`}>
                                Crear cuenta
                            </a>
                        </>
                    )}
                </div>
            </aside>
        </>
    );
}
