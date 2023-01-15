import React from "react";
import { useCartContext } from "../CartContext";
import ControlButton from "../ControlButton/ControlButton";
import "./CartItem.css"

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
    selectedQty: 1
}
 */

export default function CartItem({ details }) {
    const {imageURL, name, price, selectedQty, quantity, id, gender, color, type } = details;
    const {setIdsInCart, setTotalItems, setCartItems} = useCartContext();

    const handleDeleteItem = () => {
        // const toDelete = cartItems.get(id);

        setTotalItems(prev => prev - selectedQty);
        setIdsInCart(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);

            return newSet;
        })
        setCartItems(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);

            return newMap;
        });
    }

    return (
        <div className="cart-item">
            <div className="cart-item-img">
                <img src={imageURL} alt="..." />
            </div>
            <div className="cart-item-details">
                <div className="detail-row">
                    <h4>{name} ({gender})</h4>
                    <span>&#8377;{price}</span>
                </div>
                <div className="detail-row">
                    <ControlButton available={quantity} id={id} />
                    <button className="remove-item" onClick={handleDeleteItem}>Remove Item</button>
                </div>
                <div className="additional-details">
                    <ul>
                        <li key={type}>{type}</li>
                        <li key={gender}>{gender}</li>
                        <li key={color}>{color}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}