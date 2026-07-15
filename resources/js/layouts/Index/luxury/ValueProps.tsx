import React from 'react';

const items = [
    {
        title: 'Envío gratis',
        subtitle: 'En pedidos superiores a $1,500',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
    },
    {
        title: '100% Originales',
        subtitle: 'Autenticidad garantizada',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
    },
    {
        title: 'Pago seguro',
        subtitle: 'Encriptación de extremo a extremo',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        title: 'Muestras gratis',
        subtitle: 'En cada pedido, sin excepción',
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 12V8H6a2 2 0 0 1 0-4h12.5a.5.5 0 0 1 0 1H8" />
                <path d="M4 6v14a2 2 0 0 0 2 2h14v-4" />
                <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
            </svg>
        ),
    },
];

export default function ValueProps() {
    return (
        <section className="gp-values" aria-label="Beneficios">
            <div className="gp-values__grid">
                {items.map((it) => (
                    <div key={it.title} className="gp-value">
                        <div className="gp-value__icon">{it.icon}</div>
                        <div className="gp-value__text">
                            <strong>{it.title}</strong>
                            <span>{it.subtitle}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
