import React, { useEffect, useState } from 'react';
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:5000/list");
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
      const response = await axios.post('http://localhost:5000/remove', { id: foodId });
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
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <p onClick={() => removeFood(item.id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
