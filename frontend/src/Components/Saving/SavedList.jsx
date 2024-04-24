import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSavedProducts, clearError } from '../../Redux/Actions/productActions.js';
import useInternetState from '../../Hooks/useInternetState.jsx';
import usePagination from '../../Hooks/usePagination.jsx' 
import ProductListModel from '../../ProductModels/ProductListModel.jsx';
import image from '../../Images/SavedListBackground.jpg';
import Alert from 'react-bootstrap/Alert';

export default function SavedList() {
    const dispatch = useDispatch();
    const parentRef = useRef()
    const childRef = useRef() 
    const productsPerPage = 20;
    const { savedProducts, pages, isLoading, lineState, error } = useSelector(state => state.savedProductsList);
    const isOnline = useInternetState()

    usePagination(parentRef, childRef, () => {
      if (!isLoading && !error) {
        dispatch(getSavedProducts(productsPerPage, pages? pages : 0));
      }
    });

    useEffect(() => {
      if (error) {
        console.error(error);
        dispatch(clearError());
      }
      dispatch(getSavedProducts(productsPerPage, pages? pages : 0));
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
                padding: '20px',
            }}>
              <h1 style={{ 
                  textAlign: 'center', 
                  color: 'white'
              }}>
                  Your saves
              </h1>
              {savedProducts && savedProducts.length > 0 ? (
                <ProductListModel 
                products={savedProducts} 
                isLoading={isLoading}
                childRef={childRef} 
                parentRef={parentRef}
                lineState={lineState} />
              ) : (
                <p style={{textAlign: 'center', fontSize: '23px', color: 'white'}}>No saved products</p>
              )}
              {error && <p style={{color: 'red'}}>Error loading saved products</p>}
            </div>
          )}
        </>
      );
    }