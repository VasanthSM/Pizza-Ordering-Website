import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';

import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
    <div className='App'>
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
      </Routes>
    </div>
    </>
  );
};

export default App;
