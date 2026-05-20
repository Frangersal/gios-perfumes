import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <div className="container">
                <p className="mb-0">
                    &copy; {new Date().getFullYear()} Gio's Perfumes. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
