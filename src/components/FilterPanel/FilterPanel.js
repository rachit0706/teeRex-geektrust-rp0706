import React from "react";
import "./FilterPanel.css";

const filterData = {
    colours: [
        { name: "red", label: "Red" },
        { name: "blue", label: "Blue" },
        { name: "green", label: "Green" },
    ],
    genders: [
        { name: "men", label: "Men" },
        { name: "women", label: "Women" },
    ],
    prices: [
        { name: "0-250", label: "0-Rs250" },
        { name: "250-450", label: "Rs250-Rs450" },
        { name: "450-1000000", label: "Rs450" },
    ],
    types: [
        { name: "polo", label: "Polo" },
        { name: "hoodie", label: "Hoodie" },
        { name: "basic", label: "Basic" },
    ]
}

export default function FilterPanel({ showFilters, setShowFilters, setFilters,  filters, clearFilters, areFiltersEmpty }) {
    const { color, gender, price, type } = filters;

    const handleFilters = (prop, value) => {
        setFilters(prev => {
            const newSet = new Set(prev[prop]);

            if (newSet.has(value)) {
                newSet.delete(value);
            } else {
                newSet.add(value);
            }

            return {
                ...prev,
                [prop]: newSet
            }
        });
    };

    return (
        <div className="filter-panel">
            <div className="filters-grid">
                <div>
                    <h4>Colour</h4>
                    <ul className="filters">
                        {filterData.colours.map(obj => (
                            <li key={obj.name}>
                                <label >
                                    <input type="checkbox" checked={color.has(obj.name)} onChange={() => handleFilters('color', obj.name)} />
                                    {obj.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Gender</h4>
                    <ul className="filters">
                        {filterData.genders.map(obj => (
                            <li key={obj.name}>
                                <label >
                                    <input type="checkbox" checked={gender.has(obj.name)} onChange={() => handleFilters('gender', obj.name)} />
                                    {obj.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Price</h4>
                    <ul className="filters">
                        {filterData.prices.map(obj => (
                            <li key={obj.name}>
                                <label>
                                    <input type="checkbox" checked={price.has(obj.name)} onChange={() => handleFilters('price', obj.name)} />
                                    {obj.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Type</h4>
                    <ul className="filters">
                        {filterData.types.map(obj => (
                            <li key={obj.name}>
                                <label>
                                    <input type="checkbox" checked={type.has(obj.name)} onChange={() => handleFilters('type', obj.name)} />
                                    {obj.label}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {showFilters ? (
                <div className="mobile-menu-btns">
                    {!areFiltersEmpty() ? (<button className="clear-filters-mobile-btn" onClick={() => {
                        clearFilters();
                        setShowFilters(false);
                    }}>Clear Filters</button>): null}
                    <button className="close-filter-menu" onClick={() => setShowFilters(false)}>Close</button>
                </div>
            ) : null}
        </div>
    );
}
