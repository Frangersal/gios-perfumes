import React from 'react';

export interface CarouselItemProps {
    isActive?: boolean;
    imageUrl: string;
    altText: string;
}

export default function CarouselItem({ isActive = false, imageUrl, altText }: CarouselItemProps) {
    return (
        <div className={`carousel-item ${isActive ? 'active' : ''}`}>
            <img 
                src={imageUrl} 
                className="d-block w-100" 
                alt={altText} 
                style={{ objectFit: 'cover', height: '400px' }} 
            />
        </div>
    );
}
