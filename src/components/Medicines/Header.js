import { useContext } from "react";
import CartContext from "../../store/cart-context";

const Header = (props)=>{
    const cartCtx = useContext(CartContext);
    const { cartItem } = cartCtx;
    const numberOfCartItems = cartItem.reduce((curNumber, item)=>{
        return curNumber + item.amount;
    }, 0);
    return(
        <header>
            <h1>Your Medicine Is Here</h1>
            <button onClick={props.onShowCart}>
                <span>Your Cart</span>
                <span>{ numberOfCartItems }</span>
            </button>
        </header>
    );
}

export default Header;