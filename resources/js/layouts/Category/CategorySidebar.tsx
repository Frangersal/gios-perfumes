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
                <h6 className="fw-bold">Género</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="genderHombre" />
                            <label className="form-check-label" htmlFor="genderHombre">Hombre</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="genderMujer" />
                            <label className="form-check-label" htmlFor="genderMujer">Mujer</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="genderArabe" />
                            <label className="form-check-label" htmlFor="genderArabe">Árabe</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="genderUnisex" />
                            <label className="form-check-label" htmlFor="genderUnisex">Unisex</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">País</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="countryFrancia" />
                            <label className="form-check-label" htmlFor="countryFrancia">Francia</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="countryItalia" />
                            <label className="form-check-label" htmlFor="countryItalia">Italia</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="countryEspana" />
                            <label className="form-check-label" htmlFor="countryEspana">España</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="countryEau" />
                            <label className="form-check-label" htmlFor="countryEau">Emiratos Árabes Unidos</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="countryUsa" />
                            <label className="form-check-label" htmlFor="countryUsa">Estados Unidos</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Notas de olor</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="noteVainilla" />
                            <label className="form-check-label" htmlFor="noteVainilla">Vainilla</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="noteOud" />
                            <label className="form-check-label" htmlFor="noteOud">Oud</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="noteRosa" />
                            <label className="form-check-label" htmlFor="noteRosa">Rosa</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="noteBergamota" />
                            <label className="form-check-label" htmlFor="noteBergamota">Bergamota</label>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="mb-4">
                <h6 className="fw-bold">Tags</h6>
                <ul className="list-unstyled">
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="tagLargaDuracion" />
                            <label className="form-check-label" htmlFor="tagLargaDuracion">Larga duración</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="tagProyeccionAlta" />
                            <label className="form-check-label" htmlFor="tagProyeccionAlta">Proyección alta</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="tagNovedad" />
                            <label className="form-check-label" htmlFor="tagNovedad">Novedad</label>
                        </div>
                    </li>
                    <li>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="tagOferta" />
                            <label className="form-check-label" htmlFor="tagOferta">Oferta</label>
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
