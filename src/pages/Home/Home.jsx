import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  const [Category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  

  return (
    <div>
      <ToastContainer />
      <Navbar onSearch={setSearchQuery} />
      <Header/>
      <Menu Category={Category} searchQuery={searchQuery} setCategory={setCategory} />
      <FoodDisplay category={Category} searchQuery={searchQuery}  />
      <Footer/>
    </div>
  )
}

export default Home