import React from 'react';

export default function SearchBar() {
    return (
        <div className="bg-dark py-2">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Buscar perfumes, marcas, notas..."
                                aria-label="Buscar productos"
                                style={{ caretColor: 'white' }}
                            />
                            <button
                                className="btn btn-outline-light"
                                type="button"
                                aria-label="Buscar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
