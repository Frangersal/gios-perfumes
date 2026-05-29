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
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href={`${baseUrl}/`} className="text-decoration-none text-muted">Inicio</a>
                    </li>
                    {product.category?.name && (
                        <li className="breadcrumb-item">
                            <a href={`${baseUrl}/shop`} className="text-decoration-none text-muted">{product.category.name}</a>
                        </li>
                    )}
                    <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                </ol>
            </nav>

            {product.brand?.name && (
                <p className="text-muted text-uppercase fw-semibold small mb-1">{product.brand.name}</p>
            )}

            <h1 className="fw-bold mb-2">{product.name}</h1>

            <div className="d-flex align-items-center gap-3 mb-3">
                <h3 className="text-dark fw-bold mb-0">{formatPrice(displayPrice)}</h3>
                {hasDiscount && (
                    <span className="text-muted text-decoration-line-through fs-5">{formatPrice(regularPrice)}</span>
                )}
            </div>

            {totalStock > 0 ? (
                <p className="text-success small fw-bold mb-4">Stock disponible: {totalStock} unidades</p>
            ) : (
                <p className="text-danger small fw-bold mb-4">Sin stock disponible</p>
            )}

            {product.description && (
                <p className="mb-4 text-muted" style={{ lineHeight: '1.8' }}>{product.description}</p>
            )}

            {variants.length > 0 && (
                <div className="mb-4">
                    <strong className="d-block mb-3">Variantes (Tamaño):</strong>
                    <div className="btn-group" role="group">
                        {variants.map((variant, i) => (
                            <React.Fragment key={variant.id}>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="size_variant"
                                    id={`variant_${variant.id}`}
                                    checked={selectedVariant === i}
                                    onChange={() => setSelectedVariant(i)}
                                />
                                <label className="btn btn-outline-dark" htmlFor={`variant_${variant.id}`}>
                                    {variant.volume}
                                    {Number(variant.price) !== regularPrice && (
                                        <small className="text-muted ms-1">({formatPrice(variant.price)})</small>
                                    )}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            )}

            <div className="d-flex gap-3 mb-2 align-items-center flex-wrap">
                <div className="input-group" style={{ width: '130px' }}>
                    <button className="btn btn-outline-secondary px-3" type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="text" className="form-control text-center" value={quantity} readOnly />
                    <button className="btn btn-outline-secondary px-3" type="button"
                        onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button
                    type="button"
                    className="btn btn-dark btn-sm fw-bold text-uppercase px-3 py-2 shrink-0"
                    onClick={handleAddToCart}
                    disabled={isAdding || !activeVariant || totalStock <= 0}
                >
                    {isAdding ? 'Agregando...' : 'Añadir al carrito'}
                </button>
            </div>

            {cartFeedback && (
                <p className={`small mb-4 ${cartFeedback.includes('No se pudo') ? 'text-danger' : 'text-success'}`}>
                    {cartFeedback}
                </p>
            )}
        </div>
    );
}
