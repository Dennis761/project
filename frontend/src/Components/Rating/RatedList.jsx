import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ratedProductList, clearError } from '../../Redux/Actions/productActions.js'; 
import useInternetState from '../../Hooks/useInternetState.jsx';
import usePagination from '../../Hooks/usePagination.jsx'
import ProductListModel from '../../ProductModels/ProductListModel.jsx';
import image from '../../Images/RatedListBackground.jpg';
import Alert from 'react-bootstrap/Alert';

export default function RatedList() {
  const dispatch = useDispatch();
  const parentRef = useRef()
  const childRef = useRef() 
  const productsPerPage = 20;
  const { foundRatedProducts, pages, isLoading, lineState, error } = useSelector(state => state.ratedProductList);
  const isOnline = useInternetState()

  const intersected = usePagination(parentRef, childRef, () => {
      if (!isLoading && !error) {
        dispatch(ratedProductList(productsPerPage, pages? pages : 0));
      }
    });

  useEffect(() => {
    if (error) {
      console.error(error);
      dispatch(clearError());
    }
    dispatch(ratedProductList(productsPerPage, pages? pages : 0));
  }, [dispatch]);
  return (
    <>
      {!isOnline ? (
        <Alert variant='warning' style={{margin: '5vh 5vh'}}>
          <b>Check Your Internet Connection...</b>
        </Alert>
      ) : (
        <div style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.6)), url(${image})`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          padding: '20px'
        }}>
          <h1 style={{ textAlign: 'center', color: 'white' }}>Rated List</h1>
          <ProductListModel 
            products={foundRatedProducts} 
            isLoading={isLoading} 
            childRef={childRef} 
            parentRef={parentRef}
            lineState={lineState}/>
        </div>
      )}
    </>
  );  
}
