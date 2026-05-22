import React from 'react';

interface NoteBadgeProps {
    title: string;
    notes: string;
}

export default function NoteBadge({ title, notes }: NoteBadgeProps) {
    return (
        <div className="card text-center mb-3 h-100 shadow-sm border-0">
            <div className="card-body">
                <h6 className="card-title text-uppercase text-muted" style={{fontSize: '0.8rem'}}>{title}</h6>
                <p className="card-text fw-bold">{notes}</p>
            </div>
        </div>
    );
}
