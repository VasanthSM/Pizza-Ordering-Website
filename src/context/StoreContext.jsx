import { createContext, useEffect, useState } from "react";
import {food_list} from "../../src/assets/assets";

 
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setcartItems] = useState({});

    const addToCart = (itemid) => {
        if (!cartItems[itemid]){
            setcartItems((prev) => ({...prev, [itemid] :1 }))
        }
    else{
        setcartItems((prev) => ({
            ...prev, [itemid] : prev[itemid]+1
        }))
    }
    }

    const removeCart = (itemid)=>{
        setcartItems((prev) =>({
            ...prev,[itemid] : prev[itemid] - 1
        }))
    }

    const getTotalAmount = () =>{
        let TotalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let iteminfo = food_list.find((product)=>product._id === item);
                TotalAmount += iteminfo.price * cartItems[item];
            }
        }
        return TotalAmount;
    }

    const contextValue = {
        food_list,
        cartItems,
        setcartItems,
        addToCart,
        removeCart,
        getTotalAmount

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;