import React from "react";
import "./Header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartContext } from "../CartContext";
import { Link } from "react-router-dom";

export default function Header() {

    const { totalItems } = useCartContext();

    return (
        <div className="header">
            <Link to="/" style={{textDecoration: "none"}}>
                <span className="nav-heading">TeeRex Store</span>
            </Link>
            <div className="cart-link">
                <div className="qty-badge">
                    <p>{totalItems}</p>
                </div>
                <Link to="/cart">
                    <ShoppingCartIcon fontSize="large" className="shopping-cart-link" />
                </Link>
            </div>
        </div>
    );
}