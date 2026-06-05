import React, { useState } from 'react';
import axios from 'axios';

interface ProductVariant {
    id: number;
    volume: string;
    price: number | string;
    stock: number;
}

interface ProductInfoProps {
    product: {
        id: number;
        name: string;
        price: number | string;
        discount_price?: number | string | null;
        description?: string;
        brand?: { name?: string };
        category?: { name?: string };
        images?: Array<{ image: string; is_main?: boolean }>;
        variants?: ProductVariant[];
    };
    baseUrl: string;
}

export default function ProductInfo({ product, baseUrl }: ProductInfoProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState<number>(0);
    const [isAdding, setIsAdding] = useState(false);
    const [cartFeedback, setCartFeedback] = useState('');

    const variants: ProductVariant[] = product.variants ?? [];

    const formatPrice = (value?: number | string | null) =>
        Number(value ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

    const regularPrice = Number(product.price || 0);
    const discountedPrice = Number(product.discount_price || 0);
    const hasDiscount = discountedPrice > 0 && discountedPrice < regularPrice;
    const displayPrice = hasDiscount ? discountedPrice : regularPrice;

    const totalStock = variants.reduce((sum, v) => sum + (v.stock ?? 0), 0);

    const activeVariant = variants[selectedVariant] ?? variants[0] ?? null;

    const productMainImage = (() => {
        const images = Array.isArray(product.images) ? product.images : [];
        const main = images.find((img) => img?.is_main) || images[0];
        return main?.image || '';
    })();

    const handleAddToCart = async () => {
        if (!activeVariant) {
            setCartFeedback('No hay variante disponible para agregar.');
            return;
        }

        setIsAdding(true);
        setCartFeedback('');

        try {
            const localCartId = window.localStorage.getItem('gios_cart_id');

            const response = await axios.post(`${baseUrl}/cart/add`, {
                product_variant_id: activeVariant.id,
                quantity,
                cart_id: localCartId ? Number(localCartId) : null,
            }, {
                headers: { Accept: 'application/json' },
            });

            const dbCartId = response.data?.cart_id;
            if (dbCartId) {
                window.localStorage.setItem('gios_cart_id', String(dbCartId));
            }

            const currentItems = JSON.parse(window.localStorage.getItem('gios_cart_items') || '[]');
            const existingIndex = currentItems.findIndex((item: any) => item.product_variant_id === activeVariant.id);

            if (existingIndex >= 0) {
                currentItems[existingIndex].quantity += quantity;
                if (!currentItems[existingIndex].image_url && productMainImage) {
                    currentItems[existingIndex].image_url = productMainImage;
                }
            } else {
                currentItems.push({
                    product_id: product.id,
                    product_name: product.name,
                    product_variant_id: activeVariant.id,
                    variant_volume: activeVariant.volume,
                    price: Number(activeVariant.price || displayPrice),
                    quantity,
                    image_url: productMainImage,
                });
            }

            window.localStorage.setItem('gios_cart_items', JSON.stringify(currentItems));
            setCartFeedback('Producto agregado al carrito.');
        } catch (error) {
            console.error('Error agregando al carrito', error);
            setCartFeedback('No se pudo agregar al carrito.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="gp-product-info">
            {product.brand?.name && (
                <span className="gp-product-info__brand">{product.brand.name}</span>
            )}

            <h1 className="gp-product-info__title">{product.name}</h1>

            <div className="gp-product-info__rating" aria-label="Calificación 4.8 de 5">
                <span className="gp-star" aria-hidden="true">★★★★★</span>
                <span>4.8 · 24 reseñas</span>
            </div>

            <span className="gp-product-info__divider" />

            <div className="gp-product-info__price">
                <span className="gp-product-info__price-current">{formatPrice(displayPrice)}</span>
                {hasDiscount && (
                    <span className="gp-product-info__price-old">{formatPrice(regularPrice)}</span>
                )}
            </div>

            {totalStock > 0 ? (
                <span className="gp-product-info__stock gp-product-info__stock--ok">
                    {totalStock} unidades disponibles
                </span>
            ) : (
                <span className="gp-product-info__stock gp-product-info__stock--off">
                    Sin stock disponible
                </span>
            )}

            {product.description && (
                <p className="gp-product-info__desc">{product.description}</p>
            )}

            {variants.length > 0 && (
                <div className="gp-variants">
                    <span className="gp-variants__label">Tamaño</span>
                    <div className="gp-variants__list" role="radiogroup" aria-label="Variantes de tamaño">
                        {variants.map((variant, i) => (
                            <label
                                key={variant.id}
                                htmlFor={`variant_${variant.id}`}
                                className={`gp-variant${selectedVariant === i ? ' is-active' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="size_variant"
                                    id={`variant_${variant.id}`}
                                    checked={selectedVariant === i}
                                    onChange={() => setSelectedVariant(i)}
                                    style={{ display: 'none' }}
                                />
                                <span>{variant.volume}</span>
                                {Number(variant.price) !== regularPrice && (
                                    <small>{formatPrice(variant.price)}</small>
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            <div className="gp-product-actions">
                <div className="gp-qty" role="group" aria-label="Cantidad">
                    <button
                        type="button"
                        className="gp-qty__btn"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>
                    <input
                        type="text"
                        className="gp-qty__value"
                        value={quantity}
                        readOnly
                        aria-label="Cantidad"
                    />
                    <button
                        type="button"
                        className="gp-qty__btn"
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>
                </div>

                <button
                    type="button"
                    className="gp-btn gp-btn-dark"
                    onClick={handleAddToCart}
                    disabled={isAdding || !activeVariant || totalStock <= 0}
                >
                    {isAdding ? 'Agregando…' : 'Añadir al carrito'}
                </button>
            </div>

            {cartFeedback && (
                <p
                    className={`gp-product-feedback ${
                        cartFeedback.includes('No') || cartFeedback.includes('no')
                            ? 'gp-product-feedback--err'
                            : 'gp-product-feedback--ok'
                    }`}
                >
                    {cartFeedback}
                </p>
            )}
        </div>
    );
}
