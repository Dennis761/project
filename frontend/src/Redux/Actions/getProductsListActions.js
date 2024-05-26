import * as actionType from '../Constants/getProductsListConstants.js';
import * as actionTypeRate from '../Constants/rateProductConstants.js';
import * as actionTypeSave from '../Constants/saveProductConstants.js';
import axios from 'axios';

export const getOneProduct = (productId) => async (dispatch) => {
  try {
    dispatch({type: actionType.ONE_PRODUCT_REQUEST })

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
 
    const response = await axios.get(`http://localhost:4444/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if(!response.data){
      throw new Error('Invalid response data');
  }

    const { updatedProduct, ratedProduct, checkSavedProduct, userData } = response.data;

    if (!updatedProduct) {
      throw new Error('Token not found in local storage');
    }

    dispatch({
      type: actionTypeRate.RATE_ONE_SUCCESS,
      payload: {
        rating: null,
        ratedProduct,
      }
    })

    dispatch({
    type: actionTypeRate.AVERAGE_RATING_SUCCESS,
    payload: {
      average: null,
      averageRating: updatedProduct.rating.average
      }
    })
    
    dispatch({
      type: actionTypeSave.SAVE_PRODUCT_SUCCESS,
      payload: {
        checkSavedProduct,
        saved: updatedProduct.saved.length,
        currentSaves: null,
        saveState: null
      }
    })
    
    dispatch({
      type: actionType.ONE_PRODUCT_SUCCESS,
      payload: {
        updatedProduct,
        userData
      }
    });

  } catch (error) {
    dispatch({
      type: actionType.ONE_PRODUCT_ERROR,
      payload: {
        error: error.response.data
      }
    })
  }
};

export const getAllProducts = (products, pages) => async (dispatch) => {
  try {
    dispatch({ type: actionType.ALL_PRODUCTS_REQUEST });

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    const response = await axios.get(`http://localhost:4444/products?products=${products.toString()}&pages=${pages.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

    if(!response.data){
      throw new Error('Invalid response data');
    }

    const { productsList } = response.data;

    dispatch({
      type: actionType.ALL_PRODUCTS_SUCCESS,
      payload: {
        productsList,
        pages
      }
    });

  } catch (error) {
    dispatch({
      type: actionType.ALL_PRODUCTS_ERROR,
      payload: {
        error: error.response.data
      }
    });
  }
}
 
export const findProduct = (title) => async (dispatch) => {
  try {
    dispatch({type: actionType.FOUND_PRODUCT_REQUEST})
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    const response = await axios.get(`http://localhost:4444/found-products/${title}`,{
        headers: {
        'Authorization': `Bearer ${token}`}
      });

      if(!response.data){
        throw new Error('Invalid response data');
      }

      const foundProductsByTitle = response.data
      if(!foundProductsByTitle){
        return
      }

      dispatch({
        type: actionType.FOUND_PRODUCT_SUCCESS,
        payload: {
          title,
          foundProductsByTitle
        }
      })
    } catch (error) {
      dispatch({
        type: actionType.FOUND_PRODUCT_ERROR,
        payload: {
          error: error.response.data
        }
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({type: actionType.CLEAR_ERROR})
}