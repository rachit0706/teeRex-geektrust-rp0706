import React, { useState } from "react";
import { useCartContext } from "../CartContext";
import "./ControlButton.css";

export default function ControlButton( {available, id}){
    const {setIdsInCart, setTotalItems, setCartItems} = useCartContext();
    const [qty, setQty] = useState(1);

    const handleIncrease = () => {
        if(qty === available) {
            alert(`Sorry! you can't order more than ${available} quantities of this product`);
            return;
        }

        setQty(prev => prev + 1);
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
        if(qty === 1) {
            setIdsInCart(prev => {
                const newIds = new Set(prev);
                newIds.delete(id);

                return newIds;
            })
            setTotalItems(prev => prev - 1);
            setCartItems(prev => {
                const newCart = new Map(prev);
                newCart.delete(id);
    
                return newCart;
            })
            

            return;
        }

        setQty(prev => prev - 1);
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
            <span>{qty}</span>
            <button onClick={handleIncrease}>+</button>
        </div>
    );
};