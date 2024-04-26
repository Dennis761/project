import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearError } from '../../../Redux/Actions/cartActions.js';
import Button from 'react-bootstrap/Button';

export default function AddToCart({ id }) {
  const dispatch = useDispatch();
  const { cartItems, error } = useSelector(state => state.cart);

  const addItemsToCart = () => {
    if(error){
      console.error(error)
      dispatch(clearError())
  }
    const isItemInCart = cartItems && cartItems.some(item => item && item._id === id);
    if (!isItemInCart) {
      dispatch(addItemToCart(id));
    }
  }

  return (
    <>
      <Button variant="primary" style={{width: '40vh', height: '7vh', fontSize: '3vh'}} onClick={addItemsToCart}>+ Add to cart</Button>{' '}
    </>
  );
}
