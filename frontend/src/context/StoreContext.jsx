import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const url = "http://localhost:5000";

  const addToCart = (itemId, price, customization, name = null) => {
    setCartItems((prev) => {
      const existingItem = prev[itemId] || { quantity: 0, price: 0, customizations: [], name: null };

      return {
        ...prev,
        [itemId]: {
          quantity: existingItem.quantity + 1,
          price: price || existingItem.price,
          customizations: customization ? [...existingItem.customizations, customization] : existingItem.customizations,
          name: name || existingItem.name,
        },
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
            quantity: prev[itemId].quantity - 1,
          },
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

  const filterFoodList = (foodList, query) => {
    if (!query) return foodList;
    const lowercaseQuery = query.toLowerCase();
    return foodList.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/list`);
      setFoodList(response.data);
    } catch (error) {
      console.error('Error fetching food list:', error);
    }
  };

  const reorder = (previousCartItems) => {
    setCartItems(previousCartItems);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeCart,
    getTotalAmount,
    filterFoodList,
    reorder,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
