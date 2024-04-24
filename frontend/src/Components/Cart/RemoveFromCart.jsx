import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../Redux/Actions/cartActions.js';
import { MdCancel } from 'react-icons/md';

export default function RemoveFromCart ({ id }) {
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(id));
  };

  const hoverStyles = {
    color: isHovered ? 'red' : 'black',
    cursor: 'pointer', 
  };

  return (
    <div>
      <MdCancel
        onClick={handleRemoveItem}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={hoverStyles} 
      />
    </div>
  );
};
