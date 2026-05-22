import React from 'react';

export default function CategorySidebar() {
    return (
        <aside className="mb-4">
            <h4 className="mb-4 fw-bold">Filtros</h4>

            <div className="mb-4">
                <h6 className="fw-bold">Marcas</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="brandLP" />
                            <label className="form-check-label" htmlFor="brandLP">Lumière Paris</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="brandAM" />
                            <label className="form-check-label" htmlFor="brandAM">Aqua di Mare</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="brandVI" />
                            <label className="form-check-label" htmlFor="brandVI">Verso Italica</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="brandOR" />
                            <label className="form-check-label" htmlFor="brandOR">Oud Royale</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Familia Olfativa</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="olfAmaderada" />
                            <label className="form-check-label" htmlFor="olfAmaderada">Amaderada</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="olfCitrica" />
                            <label className="form-check-label" htmlFor="olfCitrica">Cítrica</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="olfAromatica" />
                            <label className="form-check-label" htmlFor="olfAromatica">Aromática</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Precio</h6>
                <input type="range" className="form-range" min="0" max="5000" id="priceRange" />
                <div className="d-flex justify-content-between">
                    <small>0</small>
                    <small>$5,000</small>
                </div>
            </div>
            
            <button className="btn btn-outline-dark w-100 fw-bold">Limpiar Filtros</button>
        </aside>
    );
}
