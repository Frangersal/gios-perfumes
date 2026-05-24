import React from 'react';

export default function CheckoutForm() {
    return (
        <div className="mb-4">
            <h4 className="fw-bold mb-4">Información de Envío y Pago</h4>
            
            <form>
                {/* Contacto */}
                <div className="mb-4">
                    <h5 className="mb-3 border-bottom pb-2">1. Contacto</h5>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="ejemplo@correo.com" required />
                    </div>
                </div>

                {/* Envío */}
                <div className="mb-4">
                    <h5 className="mb-3 border-bottom pb-2">2. Dirección de Envío</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="firstName" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Apellidos</label>
                            <input type="text" className="form-control" id="lastName" required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Dirección (Calle y número)</label>
                            <input type="text" className="form-control" id="address" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="zip" className="form-label">Código Postal</label>
                            <input type="text" className="form-control" id="zip" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label">Ciudad</label>
                            <input type="text" className="form-control" id="city" required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">Estado</label>
                            <input type="text" className="form-control" id="state" required />
                        </div>
                    </div>
                </div>

                {/* Pago */}
                <div className="mb-4">
                    <h5 className="mb-3 border-bottom pb-2">3. Método de Pago</h5>
                    <div className="border rounded p-3 mb-3">
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" defaultChecked />
                            <label className="form-check-label fw-bold" htmlFor="creditCard">Tarjeta de Crédito / Débito</label>
                        </div>
                        <div className="row g-3">
                            <div className="col-12">
                                <input type="text" className="form-control" placeholder="Número de Tarjeta" />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" placeholder="MM/YY" />
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" placeholder="CVC" />
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-dark w-100 py-3 text-uppercase fw-bold mt-3">Finalizar Compra</button>
            </form>
        </div>
    );
}
