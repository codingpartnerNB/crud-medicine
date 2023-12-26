import React, { useState, useEffect } from "react";

const CartContext = React.createContext({
    cartItem: [],
    totalAmount: 0,
    addCartItem: (item)=>{},
    removeCartItem: (id)=>{}
});

export const CartContextProvider = (props)=>{
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const fetching = async()=>{
        try{
          const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/cart";
          const res = await fetch(url);
          if(!res.ok){
            throw new Error("Something went wrong while getting data!");
          }
          const data = await res.json();
          setCartItems(data);
          const amount = data.reduce((current, item)=> current + (item.price * item.amount), 0);
          setTotalAmount(amount);
        }catch(err){
            console.log(err.message);
        };
      }
      useEffect(()=>{
        fetching();
      }, []);
    

    const addItem = async(item)=>{
        const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/cart";
        try{
            const existingItem = cartItems.find((ele)=>ele.id === item.id);
            if(existingItem){
                const myData = {
                    id: existingItem.id,
                    name: existingItem.name,
                    amount: existingItem.amount + 1,
                    price: existingItem.price
                }
                const res = await fetch(`${url}/${existingItem._id}`,{
                    method: "PUT",
                    body: JSON.stringify(myData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!res.ok){
                    throw new Error("Something went wrong while updating!");
                }
                setCartItems((prev)=> prev.map((i)=>i.id === existingItem.id ? {...i, amount: i.amount+1} : i));
            }
            else{
                const res = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(item),
                    headers: {
                      'Content-Type': 'application/json'
                    }
                })
                
                if(!res.ok){
                    throw new Error("Something went wrong while adding!");
                }
                const data = await res.json();
                setCartItems((prevItem)=>{
                    return [...prevItem, {...data, _id: data._id}];
                })
            }
        }catch(error){
            console.log(error.message);
        }
        setTotalAmount((prevAmount)=>{
            return prevAmount + item.price;
        });
    }
    const removeItem = async(id)=>{
        const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/cart";
        const existingCartItem = cartItems.find((item)=> item.id === id);
        if(!existingCartItem){
            return;
        }
        try{
            if(existingCartItem.amount === 1){
                const res = await fetch(`${url}/${existingCartItem._id}`, {
                    method: 'DELETE'
                })
                if(!res.ok){
                    throw new Error("Something went wrong while deleting!");
                }
                setCartItems((prevItem)=>prevItem.filter((item) => item.id !== id));
            }else{
                const myData = {
                    id: existingCartItem.id,
                    name: existingCartItem.name,
                    amount: existingCartItem.amount - 1,
                    price: existingCartItem.price
                }
                const res = await fetch(`${url}/${existingCartItem._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(myData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(!res.ok){
                    throw new Error("Something went wrong while deleting!");
                }
                setCartItems((prevItem)=>{
                    return prevItem.map((item)=>item.id === existingCartItem.id ? {...item, amount: item.amount-1} : item);
                });
            }
        }catch(error){
          console.log(error.message);
        }
        setTotalAmount((prevAmount)=>{
          return prevAmount - existingCartItem.price;
        });
    }
    const cartData = {
        cartItem: cartItems,
        totalAmount: totalAmount,
        addCartItem: addItem,
        removeCartItem: removeItem
    }
    return(
        <CartContext.Provider value={cartData}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContext;