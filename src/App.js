import { useState } from 'react';
import './App.css';
import Header from './components/Medicines/Header';
import { CartContextProvider } from './store/cart-context';
import Medicines from './components/Medicines/Medicines';
import Cart from './components/Cart/Cart';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const hideCartHandler = ()=>{
    setCartIsShown(false);
  }
  const showCartHandler = ()=>{
    setCartIsShown(true);
  }
  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Medicines />
      </main>
    </CartContextProvider>
  );
}

export default App;
