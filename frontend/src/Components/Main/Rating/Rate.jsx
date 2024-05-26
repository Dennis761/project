import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rateProduct, clearError } from '../../../Redux/Actions/rateProductActions.js';
import useDebounce from '../../Hooks/useDebounce.jsx'
import { CiStar } from "react-icons/ci";
 
export default function Rate({ id }) {
  const dispatch = useDispatch();
  const { rating, ratedProduct, average, averageRating, error } = useSelector(state => state.rateProductState);
  const [clickedStars, setClickedStars] = useState([false, false, false, false, false]);
  const [currentStars, setCurrentStars] = useState(false);

  const ratedProductState = new Array(5).fill(false).map((_, index) => index < +ratedProduct ? true : false);

  const rate = useMemo(() => {
    return (value) => {
      if (error) {
        console.error(error);
        dispatch(clearError());
      }
      dispatch(rateProduct(value + 1, id));
      setClickedStars(clickedStars.map((_, i) => i <= value ? true : false));
      setCurrentStars(true);
    };
  }, [dispatch, id, clickedStars]);

  const debounceRated = useDebounce(rate, 650)

  return (
    <>
      {(currentStars ? clickedStars : ratedProductState).map((clicked, index) => (
        <CiStar key={index} size={50} color={clicked ? "orange" : "black"} onClick={() => debounceRated(index)} />
      ))}

      {
        <p style={{fontSize: '3vh'}}>Your Rating: {rating ? rating : ratedProduct}</p>
      }
      <p style={{ fontSize: '3vh' }} className='product-rating'>Rating: {average ? average : averageRating}</p>
    </>
  );
}