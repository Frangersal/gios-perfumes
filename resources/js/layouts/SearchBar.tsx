import React, { useState, useEffect } from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        if (q) {
            setQuery(q);
        }
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
        }
    };

    return (
        <div className="bg-dark py-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <form onSubmit={handleSearch} className="input-group">
                            <input
                                type="search"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Buscar perfumes, marcas, notas..."
                                aria-label="Buscar productos"
                                style={{ caretColor: 'white' }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-light"
                                type="submit"
                                aria-label="Buscar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
