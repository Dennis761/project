import React, { useState, useCallback } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { publishProduct, clearError } from '../../Redux/Actions/myProductActions.js';
import useDebounce from '../../Hooks/useDebounce.jsx';
import Alert from 'react-bootstrap/Alert';
import './PublishProduct.css';

export default function PublishProduct() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aboutProduct, setAboutProduct] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [price, setPrice] = useState('');
  const [success, setSuccess] = useState(false);
  const {product, error} = useSelector(state => state.createProduct)
 
  const createProduct = useCallback(() => {
    function formatString(str) {
      if (str.length < 30) {
          return str;
        } else {
            let formattedStr = '';
            for (let i = 0; i < str.length; i++) {
                formattedStr += str[i];
                if ((i + 1) % 30 === 0) {
                    formattedStr += '\n';
                }
            }
            return formattedStr;
        }
    }

    let formattedDescription = formatString(description); 
    let formattedAboutProduct = formatString(aboutProduct); 

    const data = { title, description: formattedDescription, aboutProduct: formattedAboutProduct, imageURL, location, country, price };

      if(error){
        console.error(error)
        dispatch(clearError())
      }
      dispatch(publishProduct(data))
      if (product) {
        setSuccess(true);
        setTimeout(() => {
          setTitle('');
          setDescription('');
          setAboutProduct('');
          setLocation('');
          setCountry('');
          setImageURL('');
          setPrice('');
        }, 2000);
      }
    }
        , [title, description, aboutProduct, imageURL, location, country, price]);

  const debounced = useDebounce(createProduct, 2500)

  return (
    <div className='product-create-set'>
      <h2>Puplish your product!</h2>
      {error && <Alert variant={"danger"} >
          {error}!
        </Alert>}
      {success && <Alert variant={"success"} >
          You published new product!
        </Alert>}
      <div className="form-group">
        <label className="product-name">Product name:</label>
        <input
          type="text"
          id="product-name"
          placeholder='Input product name'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="product-description">Short description:</label>
        <input
          id="product-description"
          placeholder='Input short description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="product-about">Full description:</label>
        <textarea
          type="text"
          id="product-about"
          placeholder='Input product history'
          value={aboutProduct}
          onChange={(e) => setAboutProduct(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="product-image">Image:</label>
        <input
            type="file"
            id="product-image"
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
      </div>
      <div className="form-group">
        <label className="product-country">Country:</label>
        <input
          type="text"
          id="product-country"
          placeholder='Input product country'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="product-location">Location:</label>
        <input
          type="text"
          id="product-location"
          placeholder='Input product location'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="product-price">Price:</label>
        <input
          type="text"
          id="price"
          placeholder='Input product price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        </div>
      <div className="button-create-container">
        <button className='create-product-btn' onClick={debounced}>Publish product</button>
      </div>
    </div>
  );
}