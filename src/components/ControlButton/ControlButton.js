import React from "react";
import { useCartContext } from "../CartContext";
import "./ControlButton.css";

export default function ControlButton( {available, id}){
    const {setIdsInCart, setTotalItems, cartItems, setCartItems} = useCartContext();

    const handleIncrease = () => {
        const currQty = cartItems.get(id).selectedQty;

        if(currQty === available) {
            alert(`Sorry! you can't order more than ${available} quantities of this product`);
            return;
        }

        setTotalItems(prev => prev + 1);
        setCartItems(prev => {
            const newCart = new Map(prev);
            const item = {...newCart.get(id)};
            item.selectedQty++;
            newCart.set(id, item);

            return newCart;
        })
    };

    const handleDecrease = () => {
        const currQty = cartItems.get(id).selectedQty; 

        if(currQty === 1) {
            setIdsInCart(prev => {
                const newIds = new Set(prev);
                newIds.delete(id);

                return newIds;
            });
            setTotalItems(prev => prev - 1);
            setCartItems(prev => {
                const newCart = new Map(prev);
                newCart.delete(id);
    
                return newCart;
            });

            return;
        }

        setTotalItems(prev => prev - 1);
        setCartItems(prev => {
            const newCart = new Map(prev);
            const item = {...newCart.get(id)};
            item.selectedQty--;
            newCart.set(id, item);

            return newCart;
        })
    };

    return (
        <div className="qty-control-button">
            <button onClick={handleDecrease}>-</button>
            <span>{cartItems.get(id) ? cartItems.get(id).selectedQty : 1}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
};