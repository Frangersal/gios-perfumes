import React, { useEffect, useRef, useState } from 'react';
import '../../css/layouts/header.css';

export default function SearchBar() {
    const root = document.getElementById('root');
    const baseUrl = root?.getAttribute('data-base-url') || '';

    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            const isTyping =
                target &&
                (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
            if (e.key === '/' && !isTyping) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        window.location.href = `${baseUrl}/search?q=${encodeURIComponent(q)}`;
    };

    return (
        <section className="gp-search" aria-label="Buscar productos">
            <form className="gp-search__inner" onSubmit={handleSubmit} role="search">
                <label className="gp-search__field">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                    <input
                        ref={inputRef}
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busca tu fragancia, marca o nota olfativa…"
                        aria-label="Buscar perfumes, marcas o notas"
                        autoComplete="off"
                    />
                </label>

                <span className="gp-search__hint" aria-hidden="true">
                    Pulsa
                    <kbd className="gp-search__kbd">/</kbd>
                </span>

                <button type="submit" className="gp-search__submit">
                    Buscar
                </button>
            </form>
        </section>
    );
}
