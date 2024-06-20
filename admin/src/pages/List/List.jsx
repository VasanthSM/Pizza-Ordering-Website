import React, { useEffect, useState, useContext } from 'react';
import "./List.css";
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import { toast } from 'react-toastify';
import { StoreContext } from '../../../../frontend/src/context/StoreContext';

const List = () => {
  const [list, setList] = useState([]);
  const {url } = useContext(StoreContext);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/list`);
      if (response.status === 200) {
        setList(response.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/remove`, { _id: foodId });
      if (response.status === 200) {
        toast.success("Food Removed");
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Error removing food");
      console.error("Error removing food", error);
    }
  };

  return (
    <div className='list add flex-col'>
      <p className='Header-title'>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Remove</p>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor'><TiDelete className='Cursor-pointer' /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
