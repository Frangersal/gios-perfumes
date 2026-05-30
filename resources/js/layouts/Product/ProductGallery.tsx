import React, { useState } from 'react';

const placeholder = 'https://placehold.co/600x600/f4f1ec/212529?text=Perfume';

interface ProductImage {
    id: number;
    image: string;
    is_main: boolean;
}

interface ProductGalleryProps {
    images: ProductImage[];
    baseUrl: string;
}

export default function ProductGallery({ images, baseUrl }: ProductGalleryProps) {
    const normalize = (url: string) => {
        if (!url) return placeholder;
        if (/^https?:\/\//i.test(url)) return url;
        return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : '/' + url}`;
    };

    const sorted = [...images].sort((a, b) => Number(b.is_main) - Number(a.is_main));
    const [active, setActive] = useState(0);
    const mainSrc = sorted.length > 0 ? normalize(sorted[active]?.image) : placeholder;

    return (
        <div className="d-flex flex-column gap-3 sticky-top" style={{ top: '80px', zIndex: 1 }}>
            <img
                src={mainSrc}
                className="img-fluid rounded shadow-sm w-100"
                alt="Imagen principal"
                style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
            />
            {sorted.length > 1 && (
                <div className="d-flex gap-2">
                    {sorted.map((img, i) => (
                        <img
                            key={img.id}
                            src={normalize(img.image)}
                            className="img-fluid rounded"
                            alt={`Vista ${i + 1}`}
                            onClick={() => setActive(i)}
                            style={{
                                width: '23%',
                                cursor: 'pointer',
                                objectFit: 'cover',
                                aspectRatio: '1 / 1',
                                border: i === active ? '2px solid #000' : '2px solid transparent',
                                opacity: i === active ? 1 : 0.55,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
