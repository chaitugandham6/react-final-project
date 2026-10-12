
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.product];

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) =>
    dispatch({ type: "ADD", product });

  const removeFromCart = (index) =>
    dispatch({ type: "REMOVE", index });

  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
