import React, { useState } from 'react';
import "./Add.css";
import { assets } from '../../assets/assets';

const Add = () => {

  const [image, setImage] = useState(false)




  return (
    <div className='add'>
        <form className='flex-col'>
          <div className="addimage-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img src={image? URL.createObjectURL(image): assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>sete.target.files[0]}type="file" id='image' hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input type="text" name='name' placeholder='Type here..' />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea name="description" rows="4" placeholder='write the description of your pizza'></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select name="category">
                <option value="Veg-Pizza">Veg-Pizza</option>
                <option value="Non-Veg Pizza">Non-Veg Pizza</option>
                <option value="Gourmet Pizza">Gourmet Pizza</option>
                <option value="Bevarages">Bevarages</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input type="number" name="price" placeholder='₹30' />
            </div>
          </div>
          <button type='submit' className='addbutton'>Add</button>
        </form>
    </div>
  )
}

export default Add