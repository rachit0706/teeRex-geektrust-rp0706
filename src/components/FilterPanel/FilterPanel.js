import React, { useEffect, useState } from "react";
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

export default function FilterPanel({ showFilters, setShowFilters, setFilters, screenWidth }) {

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
            <div>
                <h4>Colour</h4>
                <ul className="filters">
                    {filterData.colours.map(colour => (
                        <li key={colour.name}>
                            <label >
                                <input type="checkbox" onChange={() => handleFilters('color', colour.name)} />
                                {colour.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Gender</h4>
                <ul className="filters">
                    {filterData.genders.map(gender => (
                        <li key={gender.name}>
                            <label >
                                <input type="checkbox" onChange={() => handleFilters('gender', gender.name)} />
                                {gender.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Price</h4>
                <ul className="filters">
                    {filterData.prices.map(price => (
                        <li key={price.name}>
                            <label>
                                <input type="checkbox" onChange={() => handleFilters('price', price.name)} />
                                {price.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Type</h4>
                <ul className="filters">
                    {filterData.types.map(type => (
                        <li key={type.name}>
                            <label>
                                <input type="checkbox" onChange={() => handleFilters('type', type.name)} />
                                {type.label}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            {showFilters ? (
                <>
                    <button className="apply-filters-mobile">Apply</button>
                    <button className="cancel-filters-mobile" onClick={() => setShowFilters(false)}>Cancel</button>
                </>
            ) : null}
        </div>
    );
}
