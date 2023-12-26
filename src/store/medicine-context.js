import React, { useState, useEffect } from "react";

const MedicineContext = React.createContext({
    items: [],
    addItem: (item)=>{},
    reduceAmount: (id)=>{}
});

export const MedicineContextProvider = (props)=>{
    const [items, setItems] = useState([]);
    const fetching = async()=>{
        try{
          const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/med";
          const res = await fetch(url);
          if(!res.ok){
            throw new Error("Something went wrong while getting data!");
          }
          const data = await res.json();
          setItems(data);
        }catch(err){
            console.log(err.message);
        };
    }
    useEffect(()=>{
        fetching();
    }, []);
    const addMedicineItemHandler = async(item)=>{
        const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/med";
        try{
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
            setItems((prevItem)=>{
                return [...prevItem, {...data, _id: data._id}];
            })
        }catch(error){
            console.log(error.message);
        }
    }
    const reduceMedicineAmountHandler = async(id)=>{
        const url = "https://crudcrud.com/api/fb5dc83eff7440bdbb77bb184c935edb/med";
        try{
            const existingCartItem = items.find((item)=> item.id === id);
            const myData = {
                id: existingCartItem.id,
                name: existingCartItem.name,
                desc: existingCartItem.desc,
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
            setItems((prevItem)=>{
                return prevItem.map((item)=>item.id === existingCartItem.id ? {...item, amount: item.amount-1} : item);
            });
        }catch(error){
            console.log(error.message);
        }
    }
    const medicines = {
        items: items,
        addItem: addMedicineItemHandler,
        reduceAmount: reduceMedicineAmountHandler
    }
    return(
        <MedicineContext.Provider value={medicines}>
            {props.children}
        </MedicineContext.Provider>
    );
}

export default MedicineContext;