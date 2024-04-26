import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, clearError } from '../../../Redux/Actions/getProductsListActions.js';
import useInternetState from '../../Hooks/useInternetState.jsx';
import usePagination from '../../Hooks/usePagination.jsx';
import FindProduct from '../FindProduct/FindProduct.jsx';
import ProductListModel from '../../ProductModels/ProductListModel.jsx';
import Alert from 'react-bootstrap/Alert';
import './GetAll.css';

const AllProducts = () => {
  const dispatch = useDispatch();
  const parentRef = useRef()
  const childRef = useRef() 
  const productsPerPage = 15
  const { productsList, isLoading, pages, lineState, error } = useSelector(state => state.getProducts);

  const isOnline = useInternetState()

  const intersected = usePagination(parentRef, childRef, () => {
    dispatch(getAllProducts(productsPerPage, pages? pages : 0));
  });

  useEffect(() => {
    if(error){
      console.error(error)
      dispatch(clearError())
  }

    dispatch(getAllProducts(productsPerPage, pages? pages : 0));
  }, [dispatch])

  return (
    <>
    {!isOnline ? (
      <Alert variant='warning' style={{margin: '5vh 5vh'}}>
        <b>Check Your Internet Connection...</b>
      </Alert>
    ) : (
    <div className="products-container">
      <h1 style={{ textAlign: 'center', color: 'white' }}>Recommendations</h1>
      <FindProduct />
        <ProductListModel 
        productsPerPage={productsPerPage} 
        products={productsList} 
        isLoading={isLoading} 
        childRef={childRef} 
        parentRef={parentRef}
        lineState={lineState}/>
    </div>  
    )}
    </>
  ); 
};
 
export default AllProducts;