import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { editMyProduct, clearError } from '../../../Redux/Actions/myProductActions.js';
import './EditProduct.css';

const EditProduct = ({ onClose, id }) => {
  const [description, setDescription] = useState('');
  const [aboutProduct, setAboutProduct] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch()
  const {error} = useSelector(state => state.myProduct)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(error){
      console.error(error)
      dispatch(clearError())
  }
    const editedProduct = {description, aboutProduct, imageURL, country, location, price}
    dispatch(editMyProduct(id, editedProduct, onClose))
  }

  return (
    <div className="edit-product-container">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          <p>Description:</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your description"
          />
        </label>
        <label>
          <p>Full description:</p>
          <textarea
            type="text"
            value={aboutProduct}
            onChange={(e) => setAboutProduct(e.target.value)}
            placeholder="Enter your full description"
          />
        </label>
        <label>
          <p>Country:</p>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
          />
        </label>
        <label>
          <p>Location:</p>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
          />
        </label>
        <label>
          <p>Avatar URL:</p>
          <input
            type="file"
            id="productImage"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result;
                  setImageURL(base64String);
                };
              reader.readAsDataURL(file);
            }}
         />
        </label>
        <label>
          <p>Price: </p>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your price"
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProduct;
