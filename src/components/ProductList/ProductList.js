import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

export default function ProductList({products}) {
    return (
        <div className="product-list">
            {products.map(product => <ProductCard product={product} key={product.id} />)}
        </div>
    );
}