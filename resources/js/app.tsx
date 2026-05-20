import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div>
            <h1>Hello world!</h1>
            <h2>Bienvenidos a Gio's Perfumes</h2>
        </div>
    );
}

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
