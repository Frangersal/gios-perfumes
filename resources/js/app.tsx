import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div className="container mt-5">
            <h1 className="text-primary">Hello world!</h1>
            <h2>Bienvenidos a Gio's Perfumes</h2>
            <div className="mt-4">
                <button className="btn btn-primary me-2">Comprar Perfume</button>
                <button className="btn btn-success">Ver Catálogo</button>
            </div>
        </div>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
