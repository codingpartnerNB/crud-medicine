import React, {useContext} from "react";
import CartContext from "../../../store/cart-context";
import Button from "../../UI/Button";
import MedicineContext from "../../../store/medicine-context";


const MedItem = (props)=>{
    const price = `Rs ${props.price.toFixed(2)}`;
    const cartCtx = useContext(CartContext);
    const medCtx = useContext(MedicineContext);
    const hasItems = medCtx.items.length > 0;
    const cartHandler = ()=>{
        cartCtx.addCartItem({
            id: props.id,
            name: props.name,
            amount: 1,
            price: props.price
        })
        medCtx.reduceAmount(props.id);
    }
    return(
        <tr>
            <td>{props.name}</td>
            <td>{props.desc}</td>
            <td>{price}</td>
            <td>{hasItems ? props.amount : "Out of stock"}</td>
            <td>{<Button onClick={cartHandler} disabled={!hasItems && true}>Add To Bill</Button>}</td>
        </tr>
    );
}

export default MedItem;