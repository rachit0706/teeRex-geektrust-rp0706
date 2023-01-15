import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import ProductList from "../ProductList/ProductList";
import FilterPanel from "../FilterPanel/FilterPanel";
import Header from "../Header/Header";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useWindowWidth } from "../customHooks";
import { applyFilters } from "../helpers";
import Footer from "../Footer/Footer";

const API = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const SearchBar = ({ displayFilters, setSearchQuery, areFiltersEmpty }) => {

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search by name, colour or type" onChange={(e) => handleSearch(e)} />
            <SearchIcon className="icon search-icon" />
            <div className="mobile-filter-container">
                {!areFiltersEmpty() ? <div className="filter-active"></div> : null}
                <FilterAltIcon className="icon filter-btn-mobile" onClick={() => displayFilters(prev => !prev)} />
            </div>
        </div>
    );
}

export default function HomePage() {
    const defaultFilters = {
        color: new Set(),
        gender: new Set(),
        price: new Set(),
        type: new Set()
    }
    /* STATES */
    const screenWidth = useWindowWidth();
    const [fixedData, setFixedData] = useState([]);
    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState(defaultFilters);

    useEffect(() => {
        fetchProducts(API);
    }, []);

    const fetchProducts = async (url) => {
        try {
            const response = await axios.get(url);
            setProducts(response.data);
            setFilteredProducts(response.data);
            setFixedData(response.data);
        } catch (e) {
            alert(e);
        }
    }

    // SEARCH FUNCTIONALITY
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredProducts(products);
        } else {
            const value = searchQuery;
            let filtered = products.filter(product => {
                const { name, color, type } = product;
                return name.toLowerCase().includes(value) || color.toLowerCase().includes(value) || type.toLowerCase().includes(value);
            });

            setFilteredProducts(filtered);
        }
    }, [searchQuery, products])

    // FILTER APPLICATION
    useEffect(() => {
        let currProducts = [...fixedData];

        if (currProducts.length) {
            let filtered = applyFilters(currProducts, filters);

            setProducts(filtered);
        }

    }, [filters, fixedData])


    const clearFilters = () => {
        setFilters(defaultFilters);
        setProducts(fixedData);
    }

    // Checking if filters are not applied
    const areFiltersEmpty = () => {
        const { color, gender, price, type } = filters;

        return !color.size && !gender.size && !price.size && !type.size;
    }

    return (
        <>
            <Header />
            <div className="search-bar-area">
                {!areFiltersEmpty() ? <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button> : null}
                <SearchBar displayFilters={setShowFilters} setSearchQuery={setSearchQuery} areFiltersEmpty={areFiltersEmpty} />
            </div>
            <div className="products-n-filters">
                {(screenWidth < 600 ? showFilters : true) ? <FilterPanel showFilters={showFilters} filters={filters} setShowFilters={setShowFilters} setFilters={setFilters} clearFilters={clearFilters} areFiltersEmpty={areFiltersEmpty} /> : null}
                <ProductList products={filteredProducts} />
            </div>
            <Footer />
        </>
    );
}