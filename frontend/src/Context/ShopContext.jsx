import React, {createContext, useEffect, useState} from "react";

export const ShopContext =  createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => setAll_Product(data))

        if(localStorage.getItem("auth-token"))
        {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem("auth-token")}`,
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(),
            })
                .then((resp) => resp.json())
                .then((data) => {setCartItems(data)});
        }

    }, [])

    const [cartItems, setCartItems] = useState(getDefaultCart());




    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(cartItems);
    }

    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;