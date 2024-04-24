import * as actionType from '../Constants/productConstants.js';
import axios from 'axios';

export const getOneProduct = (productId) => async (dispatch) => {
  try {
    dispatch({type: actionType.ONE_PRODUCT_REQUEST })

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
 
    const response = await axios.get(`http://localhost:4444/product/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const { doc, ratedProduct, checkSavedProduct, userData } = response.data;

    if (!doc) {
      throw new Error('Token not found in local storage');
    }

    dispatch({
      type: actionType.RATE_ONE_SUCCESS,
      payload: {
        rating: null,
        ratedProduct,
      }
    })

    dispatch({
    type: actionType.AVERAGE_RATING_SUCCESS,
    payload: {
      average: null,
      averageRating: doc.rating.average
      }
    })
    
    dispatch({
      type: actionType.SAVE_PRODUCT_SUCCESS,
      payload: {
        checkSavedProduct,
        saved: doc.saved.length,
        saves: null,
        saveState: null
      }
    })
    
    dispatch({
      type: actionType.ONE_PRODUCT_SUCCESS,
      payload: {
        doc,
        userData
      }
    });

  } catch (error) {
    dispatch({
      type: actionType.ONE_PRODUCT_ERROR,
      payload: error
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
    const { productsList } = response.data;
    dispatch({
      type: actionType.ALL_PRODUCTS_SUCCESS,
      payload: {
        productsList,
        pages
      }
    });

  } catch (error) {
    console.error('error:', error)
    dispatch({
      type: actionType.ALL_PRODUCTS_ERROR,
      payload: error.message 
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
    const response = await axios.get(`http://localhost:4444/products/${title}`,{
        headers: {
        'Authorization': `Bearer ${token}`}
      });
      const foundProducts = response.data
      if(!foundProducts){
        return
      }

      dispatch({
        type: actionType.FOUND_PRODUCT_SUCCESS,
        payload: {
          title,
          foundProducts
        }
      })
    } catch (error) {
      dispatch({
        type: actionType.FOUND_PRODUCT_ERROR,
        payload: error
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({type: actionType.CLEAR_ERROR})
}