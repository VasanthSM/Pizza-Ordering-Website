import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import { useLocation } from 'react-router-dom';
import Account from './components/account/Account';
import Order from './components/order/Order';
import AboutUS from './components/AboutUs/AboutUS';
import ForgotPassword from './pages/LogIn/ForgotPassword';
import ResetPassword from './pages/LogIn/ResetPassword';
import PageNotFound from './components/PageNotFound';

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
        <Route path="/specials" element={<Menu />} />
        <Route path="/contact" element={<AboutUS />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/account' element={<Account />} />
        <Route path='/orderlist' element={<Order />} />
        <Route path='/about' element={<AboutUS/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path= "/resetpassword/:token" element={<ResetPassword/>}/>
        <Route path= "/*" element={<PageNotFound/>}/>
      </Routes>
    </div>
    </>
  );
};

export default App;
