import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import ProductList from "../ProductList/ProductList";
import FilterPanel from "../FilterPanel/FilterPanel";
import Header from "../Header/Header";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { FlashAuto } from "@mui/icons-material";
import { useWindowWidth } from "../customHooks";

const API = "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

const SearchBar = ({displayFilters, setSearchQuery}) => {

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchQuery(value);
    }

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search by name, colour or type" onChange={(e) => handleSearch(e)} />
            <SearchIcon className="icon search-icon" />
            <FilterAltIcon className="icon filter-btn-mobile" onClick={() => displayFilters(prev => !prev)} />
        </div>
    );
}

export default function HomePage() {
    /* STATES */
    const screenWidth = useWindowWidth();
    const [products, setProducts] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        color: new Set(),
        gender: new Set(),
        price: new Set(),
        type: new Set()
    });
    

    useEffect(() => {
        fetchProducts(API);
    }, []);

    const fetchProducts = async (url) => {
        try {
            const response = await axios.get(url);
            setProducts(response.data);
            setFilteredProducts(response.data);
        }catch (e) {
            alert(e);
        }
    }

    // SEARCH FUNCTIONALITY
    useEffect(() => {
        if(searchQuery === "") {
            setFilteredProducts(products);
        }else {
            const value = searchQuery;
            let filtered = products.filter(product => {
                const { name, color, type} = product;


                return name.toLowerCase().includes(value) || color.toLowerCase().includes(value) || type.toLowerCase().includes(value);
            });

            setFilteredProducts(filtered);
        }
    }, [searchQuery, products])

    useEffect(() => {

    })

    const applyFilters = (data) => {
        
    };

    return (
        <div className="home-page">
            <Header />
            <SearchBar displayFilters={setShowFilters} setSearchQuery={setSearchQuery} />
            <div className="products-n-filters">
                {(screenWidth < 600 ? showFilters : true) ? <FilterPanel showFilters={showFilters} setShowFilters={setShowFilters} setFilters={setFilters} screenWidth={screenWidth} /> : null}
                <ProductList products={filteredProducts} />
            </div>
        </div>
    );
}