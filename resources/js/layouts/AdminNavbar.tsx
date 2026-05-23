import React from 'react';

export default function AdminNavbar() {
    return (
        <header className="p-3 bg-white border-bottom shadow-sm">
            <div className="container-fluid">
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div>
                        <span className="fs-5 fw-semibold text-dark">Panel de Control</span>
                    </div>

                    <div className="d-flex align-items-center">
                        <form className="w-100 me-3" role="search">
                            <input type="search" className="form-control" placeholder="Buscar..." aria-label="Search" />
                        </form>
                        <a href="/" className="btn btn-outline-primary me-2">Ver Tienda</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
