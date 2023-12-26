import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.cartItem.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeCartItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addCartItem(item);
  };

  const cartItems = (
    <ul>
      {cartCtx.cartItem.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onHideCart={props.onHideCart}>
      {cartItems}
      <div>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        <button onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
