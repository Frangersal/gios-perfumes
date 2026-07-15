import React, { useState } from 'react';

const placeholder = 'https://placehold.co/800x800/efe6d4/1c1814?text=Gio%27s';

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
        <div className="gp-gallery">
            <div className="gp-gallery__main">
                <img src={mainSrc} alt="Imagen principal" loading="lazy" />
            </div>

            {sorted.length > 1 && (
                <div className="gp-gallery__thumbs">
                    {sorted.map((img, i) => (
                        <button
                            key={img.id}
                            type="button"
                            className={`gp-gallery__thumb${i === active ? ' is-active' : ''}`}
                            onClick={() => setActive(i)}
                            aria-label={`Ver imagen ${i + 1}`}
                        >
                            <img src={normalize(img.image)} alt={`Vista ${i + 1}`} loading="lazy" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
