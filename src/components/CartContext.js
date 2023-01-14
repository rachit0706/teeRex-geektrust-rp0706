import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [totalItems, setTotalItems] = useState(0);
    const [idsInCart, setIdsInCart] = useState(new Set());
    const [cartItems, setCartItems] = useState(new Map());

    return <CartContext.Provider value={{totalItems, setTotalItems, idsInCart, setIdsInCart, cartItems, setCartItems}}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
    const contextValue = useContext(CartContext);

    if(contextValue === undefined) {
        throw new Error("useCounter must be used inside CartProvider");
    }

    return contextValue;
}