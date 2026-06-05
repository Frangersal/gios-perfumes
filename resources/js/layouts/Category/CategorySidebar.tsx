import React from 'react';

interface FilterOption {
    id: string;
    label: string;
}

const BRANDS: FilterOption[] = [
    { id: 'brandLP', label: 'Lumière Paris' },
    { id: 'brandAM', label: 'Aqua di Mare' },
    { id: 'brandVI', label: 'Verso Italica' },
    { id: 'brandOR', label: 'Oud Royale' },
];

const GENDERS: FilterOption[] = [
    { id: 'genderHombre', label: 'Hombre' },
    { id: 'genderMujer', label: 'Mujer' },
    { id: 'genderArabe', label: 'Árabe' },
    { id: 'genderUnisex', label: 'Unisex' },
];

const COUNTRIES: FilterOption[] = [
    { id: 'countryFrancia', label: 'Francia' },
    { id: 'countryItalia', label: 'Italia' },
    { id: 'countryEspana', label: 'España' },
    { id: 'countryEau', label: 'Emiratos Árabes Unidos' },
    { id: 'countryUsa', label: 'Estados Unidos' },
];

const NOTES: FilterOption[] = [
    { id: 'noteVainilla', label: 'Vainilla' },
    { id: 'noteOud', label: 'Oud' },
    { id: 'noteRosa', label: 'Rosa' },
    { id: 'noteBergamota', label: 'Bergamota' },
];

const TAGS: FilterOption[] = [
    { id: 'tagLargaDuracion', label: 'Larga duración' },
    { id: 'tagProyeccionAlta', label: 'Proyección alta' },
    { id: 'tagNovedad', label: 'Novedad' },
    { id: 'tagOferta', label: 'Oferta' },
];

interface FilterGroupProps {
    title: string;
    options: FilterOption[];
}

function FilterGroup({ title, options }: FilterGroupProps) {
    return (
        <div className="gp-cat-filter">
            <h6 className="gp-cat-filter__title">{title}</h6>
            <ul className="gp-cat-filter__list">
                {options.map((opt) => (
                    <li key={opt.id}>
                        <label htmlFor={opt.id} className="gp-cat-check">
                            <input type="checkbox" id={opt.id} />
                            <span>{opt.label}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function CategorySidebar() {
    return (
        <aside className="gp-cat-sidebar">
            <h4 className="gp-cat-sidebar__title">
                Filtros<em> refinados</em>
            </h4>
            <span className="gp-cat-sidebar__divider" />

            <FilterGroup title="Marcas" options={BRANDS} />
            <FilterGroup title="Género" options={GENDERS} />
            <FilterGroup title="País" options={COUNTRIES} />
            <FilterGroup title="Notas de olor" options={NOTES} />
            <FilterGroup title="Tags" options={TAGS} />

            <div className="gp-cat-filter">
                <h6 className="gp-cat-filter__title">Precio</h6>
                <input type="range" className="gp-cat-range" min="0" max="5000" defaultValue="2500" id="priceRange" />
                <div className="gp-cat-range__labels">
                    <span>$0</span>
                    <span>$5,000</span>
                </div>
            </div>

            <button type="button" className="gp-btn gp-btn-outline" style={{ width: '100%' }}>
                Limpiar filtros
            </button>
        </aside>
    );
}
