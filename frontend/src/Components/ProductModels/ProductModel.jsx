import React from 'react';
import { Link } from 'react-router-dom';
import SaveState from '../Main/Saving/SaveState.jsx'
import Rate from '../Main/Rating/Rate.jsx'
import AddToCart from '../Main/Cart/AddToCart.jsx';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';

export default function ProductModel({ product, isLoading, userData }) {
  return (
    <div>
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
              width: '10vh',
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        product ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Image 
                src={product.imageURL} 
                className='product-images' 
                style={{ 
                  width: '70vh', 
                  marginLeft: '10vh', 
                  marginRight: '10vh', 
                  height: 'auto', 
                  border: '1px black solid' 
                }} 
                thumbnail 
              />
            </div>
            <div style={{ marginTop: '1.5vh' }}>
              <h2 className='product-title'
              style={{ 
                fontSize: '3vh', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                whiteSpace: 'pre-line' 
                }}>
                Product: {product.title}
              </h2>
              <p className='product-description'
              style={{ 
                fontSize: '3vh', 
                textAlign: 'center', 
                whiteSpace: 'pre-line' 
                }}>
                Description: {product.description}
              </p>
              <p 
              style={{ 
                fontSize: '3vh', 
                textAlign: 'center',
                whiteSpace: 'pre-line' 
                }}>
                About Product: {product.aboutProduct}
              </p>
              <div style={{ marginTop: '5vh', height: 'auto' }}>
                <Rate id={product._id} />
                <SaveState id={product._id} />
                <p style={{ fontSize: '3vh' }} className='product-price'>
                  Price: {product.price} $
                </p>
                <AddToCart id={product._id} />
              </div>
              <p style={{ fontSize: '3vh' }} className='product-views'>
                Viewed: {product.viewsCount}
              </p>
              <h1 style={{ fontSize: '3vh' }} className='product-location'>
                  Country: {product.country}, Location: {product.location}
                </h1>
              <p style={{ fontSize: '3vh' }} className='product-creator'>
                Product Published: {
                  <Link 
                    style={{ fontSize: '3vh', textDecoration: 'none' }} 
                    to={`/profile/${userData.token}`}
                  >
                    {userData.name}
                  </Link>
                }
              </p>
            </div>
          </div>
        ) : (
          <p>Product not found</p>
        )
      )}
    </div>
  );
}
