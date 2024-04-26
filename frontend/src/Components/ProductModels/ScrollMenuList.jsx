import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteProduct from '../Main/ProductActions/DeleteProduct.jsx';
import EditProduct from '../Main/ProductActions/EditProduct.jsx';
import Spinner from 'react-bootstrap/Spinner';
import './ScrollMenuList.css';

const ScrollMenu = ({ items, isLoading, state }) => {
    const [editingItemId, setEditingItemId] = useState(null);

    const handleEditClick = (itemId) => {
        setEditingItemId(itemId === editingItemId ? null : itemId);
    };

    const handleCloseEdit = () => {
        setEditingItemId(null);
    };

    function truncateString(str) {
        if (str.length > 18) {
          return str.substring(0, 18) + '...';
        } else {
          return str;
        }
      }

    return (
        <>
            {isLoading ? (
                    <div 
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh'
                    }}
                  >
                    <Spinner 
                      animation="border" 
                      role="status" 
                      style={{
                        height: '10vh',
                        width: '10vh'
                      }}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                  ) : 
                <div className="scroll-menu">
                    <ul>
                        {items && items.length > 0 ? (
                            items.map(item => (
                                item && <li key={item._id}>
                                    <div>
                                        <Link to={`/product/${item._id}`}>
                                            <h2 className='title-in-product'>Title: {truncateString(item.title)}</h2>
                                            <p className='description-in-product'>Description: {truncateString(item.description)}</p>
                                            <p className='location-in-product'>Location: {truncateString(item.location)}</p>
                                            <p className='rating-in-product'>Rating: {truncateString(item.rating.average)}/5</p>
                                            <p className='views-in-product'>Count of views: {truncateString(item.viewsCount)}</p>
                                        </Link>
                                        {state && <button className="edit-product-button" onClick={() => handleEditClick(item._id)}>
                                            {editingItemId === item._id ? 'Close Edit' : 'Edit Product'}
                                        </button>}
                                        {editingItemId && <EditProduct id={item._id} onClose={handleCloseEdit} />}
                                        {state && <DeleteProduct id={item._id} />}
                                    </div>
                                </li>
                            ))
                        ) : (
                    <h1>No products available</h1>
                )}
            </ul>
        </div>}
        </>
    );
};

export default ScrollMenu;