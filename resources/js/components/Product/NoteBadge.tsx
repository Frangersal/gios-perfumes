import React from 'react';

interface NoteBadgeProps {
    title: string;
    notes: string;
}

export default function NoteBadge({ title, notes }: NoteBadgeProps) {
    return (
        <div className="gp-onote">
            <h4 className="gp-onote__title">{title}</h4>
            <p className="gp-onote__notes">{notes}</p>
        </div>
    );
}
