import { createContext,useState } from "react";
import { food_list } from "../../src/assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId, price, customization = null) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId] || { quantity: 0, price: 0, customizations: [] };
      return {
        ...prev,
        [itemId]: {
          quantity: existingItem.quantity + 1,
          price: price || existingItem.price,
          customizations: customization ? [...existingItem.customizations, customization] : existingItem.customizations
        }
      };
    });
  };

  const removeCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId].quantity <= 1) {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      } else {
        return {
          ...prev,
          [itemId]: {
            ...prev[itemId],
            quantity: prev[itemId].quantity - 1
          }
        };
      }
    });
  };
  

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item].quantity > 0) {
        totalAmount += cartItems[item].price * cartItems[item].quantity;
      }
    }
    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeCart,
    getTotalAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;