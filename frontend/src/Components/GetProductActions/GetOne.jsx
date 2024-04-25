import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { getOneProduct, clearError } from '../../Redux/Actions/getProductsListActions.js';
import ProductModel from '../../ProductModels/ProductModel.jsx'

const Product = () => {
  const { productId } = useParams(); 
  const dispatch = useDispatch();
  const {saveState} = useSelector(state => state.saveProductState)
  const {  
    product,
    userData, 
    isLoading, 
    error } = useSelector(state => state.getProduct);
   
  useEffect(() => {
    if(error){
      console.error(error)
      dispatch(clearError())
    }
    dispatch(getOneProduct(productId));
  }, [dispatch, productId])

  return (
    <div>
      <ProductModel
        product={product} 
        isLoading={isLoading} 
        userData={userData}
        saveState={saveState}
        /> 
    </div>
  );
};

export default Product