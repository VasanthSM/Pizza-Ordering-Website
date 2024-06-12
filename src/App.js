import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import { useLocation } from 'react-router-dom';
import Account from './components/account/Account';
import Order from './components/order/Order';

const App = () => {const location = useLocation()
  
  const displayNavbar = !['/'].includes(location.pathname)

  return (
    <>
    <div className='App'>
      {displayNavbar && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path="/menu" element={<Menu  />} />
        <Route path="/about" element={<Footer />} />
        <Route path="/specials" element={<Menu />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/orderlist' element={<Order />} />
      </Routes>
    </div>
    </>
  );
};

export default App;
