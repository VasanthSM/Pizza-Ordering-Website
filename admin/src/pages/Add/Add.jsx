import React, { useState } from 'react';
import "./Add.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Add = () => {
  const [image, setImage] = useState(null); 
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Veg_Pizza" 
  });

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append("name", data.name || "");
    formData.append("description", data.description || "");
    formData.append("price", data.price !== "" ? Number(data.price) : null);
    formData.append("category", data.category || "");
    formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:5000/data", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Response:", response.data);
      if (response.data.message) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Veg_Pizza"
        });
        setImage(null);
        toast.success("Food Added Successfully")
      } else {
        toast.error("Food Does not added")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="addimage-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeData} value={data.name} type="text" name='name' placeholder='Type here..' required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeData} value={data.description} name="description" rows="4" placeholder='write the description of your pizza' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeData} name="category" value={data.category}>
              <option value="Veg_Pizza">Veg_Pizza</option>
              <option value="Non-Veg Pizza">Non-Veg Pizza</option>
              <option value="Gourmet Pizza">Gourmet Pizza</option>
              <option value="Bevarages">Beverages</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeData} value={data.price} type="number" name="price" placeholder='₹100' required />
          </div>
        </div>
        <button type='submit' className='addbutton'>Add</button>
      </form>
    </div>
  )
}

export default Add;
