import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const [Category, setCategory] = useState('All')
  return (
    <div>
      <Header/>
      <Menu Category={Category} setCategory={setCategory} />
      <FoodDisplay category={Category} />
      <Footer/>
    </div>
  )
}

export default Home