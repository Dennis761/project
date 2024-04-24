import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { findProduct } from '../../Redux/Actions/getProductsListActions';
import './FindProduct.css';

export default function FindProduct() {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const searchProduct = () => {

    const trimmed = title.trim()
    if (trimmed === '') {
      return; 
    }

      dispatch(findProduct(trimmed))
      navigate(`/foundproduct/${trimmed}`)
  }

  return (
    <>
      <div className="search-container">
        <form>
        <input
          type="text"
          placeholder="Input product name"
          className="search-input-main"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FaSearch className="search-main-button" onClick={searchProduct} />
        </form>
      </div>
    </>
  );
}