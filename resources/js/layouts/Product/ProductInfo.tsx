import React, { useState } from 'react';

export default function ProductInfo() {
    const [quantity, setQuantity] = useState(1);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Inicio</a></li>
                    <li className="breadcrumb-item"><a href="/shop" className="text-decoration-none text-muted">Mujer</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Aqua di Mare Essenza</li>
                </ol>
            </nav>

            <h1 className="fw-bold mb-2">Aqua di Mare Essenza</h1>
            <h3 className="text-primary fw-bold mb-3">$2,450.00 MXN</h3>
            
            <p className="text-success small fw-bold mb-4">Stock disponible: 15 unidades</p>

            <p className="mb-4 text-muted" style={{ lineHeight: '1.8' }}>
                Una fragancia que captura la esencia del océano. Fresca, vibrante y llena de energía. Ideal para el día a día y ocasiones especiales durante el verano. Destaca tu presencia con elegancia y frescura natural.
            </p>

            {/* Variantes */}
            <div className="mb-4">
                <strong className="d-block mb-3">Variantes (Tamaño):</strong>
                <div className="btn-group" role="group">
                    <input type="radio" className="btn-check" name="size_variant" id="size50" defaultChecked />
                    <label className="btn btn-outline-dark" htmlFor="size50">50 ml</label>

                    <input type="radio" className="btn-check" name="size_variant" id="size100" />
                    <label className="btn btn-outline-dark" htmlFor="size100">100 ml <small className="text-muted">(+$800)</small></label>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex gap-3 mb-5">
                <div className="input-group" style={{ width: '130px' }}>
                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <input type="text" className="form-control text-center font-weight-bold" value={quantity} readOnly />
                    <button className="btn btn-outline-secondary px-3" type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <button className="btn btn-primary flex-grow-1 fw-bold text-uppercase">Añadir al carrito</button>
            </div>
        </div>
    );
}
