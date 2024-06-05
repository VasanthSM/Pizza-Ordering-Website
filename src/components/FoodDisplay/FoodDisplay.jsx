import React, { useContext } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const FoodDisplay = ({ category, searchQuery }) => {
  const { food_list } = useContext(StoreContext);

  const groupByCategory = (items) => {
    return items.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  };

  const filterBySearchQuery = (items, query) => {
    if (!query) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredFoodList = filterBySearchQuery(food_list, searchQuery);
  const categorizedFoodList = groupByCategory(filteredFoodList);

  return (
    <div className='FoodDisplay'>
      <h2>Best Pizzas in Your Area!</h2>
      {Object.keys(categorizedFoodList).map((cat) => (
        <div key={cat}>
          <h3 className='fooddisplay-category'>{cat}</h3>
          <div className="fooddisplay-list">   
            {categorizedFoodList[cat].map((item, index) => {
              if (category === 'All' || category === item.category) {
                return (
                  <FoodItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    type={item.type}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodDisplay;
