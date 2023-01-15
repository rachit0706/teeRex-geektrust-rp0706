import React from "react";
import { useCartContext } from "../CartContext";
import "./ProductCard.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ControlButton from "../ControlButton/ControlButton";

/*
EXAMPLE DATA = {
    color: "Black"
    currency: "INR"
    gender: "Men"
    id: 1
    imageURL: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png"
    name: "Black Polo"
    price: 250
    quantity: 3
    type: "Polo"
}
 */
export default function ProductCard({ product }) {
    const {idsInCart, setIdsInCart, setTotalItems, setCartItems} = useCartContext();
   
    const handleAddToCart = (id) => {
        setIdsInCart(prev => {
            const newSet = new Set(prev);

            newSet.add(id);
            return newSet;
        });
        addItem(id);
        setTotalItems(prev => prev + 1);
    }

    const addItem = (id) => {
        const item = {
            ...product,
            selectedQty: 1
        };

        setCartItems(prev => {
            const newItems = new Map(prev);
            newItems.set(id, item);
            return newItems;
        });
    }

    return (
        <div className="product-card">
            {product.quantity <= 0 ? (
                <div className="sold-out-banner">
                    <span className="sold-out">Sold Out!</span>
                </div>
            ) : null}
            <div className="card-image">
                <img src={product.imageURL} alt="..." />
            </div>
            <div className="card-details">
                <div className="name-n-price">
                    <h4>{product.name}</h4>
                    <p className="price">&#8377;{product.price}</p>
                </div>
                {idsInCart.has(product.id) ? <ControlButton available={product.quantity} id={product.id} /> : (
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product.id)}><AddShoppingCartIcon fontSize="small" /></button>
                )}
            </div>
        </div>
    );
}