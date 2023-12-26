import { useContext, useRef } from "react";
import Button from "../../UI/Button";
import CartContext from "../../../store/cart-context";
import MedicineContext from "../../../store/medicine-context";

const FormInput = ()=>{
    const cartCtx = useContext(CartContext);
    const medCtx = useContext(MedicineContext);
    const medName = useRef();
    const desc = useRef();
    const price = useRef();
    const quantity = useRef();

    const submitHandler = (event)=>{
        event.preventDefault();
        const nameInput = medName.current.value;
        const descInput = desc.current.value;
        const priceInput = price.current.value;
        const quantityInput = quantity.current.value;
        const med = {
            id: Math.floor(Math.random()*20),
            name: nameInput,
            desc: descInput,
            price: +priceInput,
            amount: +quantityInput
        }
        medCtx.addItem(med);
    }

    return(
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="name">Medicine name</label>
                <input type="text" id="name" ref={medName} />
            </div>
            <div>
                <label htmlFor="desc">Description</label>
                <input type="text" id="desc" ref={desc} />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={price} />
            </div>
            <div>
                <label htmlFor="quantity">Quantity available</label>
                <input type="number" id="quantity" ref={quantity} />
            </div>
            <div>
                <Button type="submit">Add Product</Button>
            </div>
        </form>
    );
}

export default FormInput;