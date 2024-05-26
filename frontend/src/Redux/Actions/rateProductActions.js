import * as actionType from '../Constants/rateProductConstants.js';
import axios from 'axios';

export const rateProduct = (rating, id) => async (dispatch) => {
    try { 
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(`http://localhost:4444/rated-one`, { rating, id }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.data){
            throw new Error('Invalid response data');
        }

        const { average, rated, updatedProduct } = response.data;

        dispatch({
            type: actionType.RATE_ONE_SUCCESS,
            payload: {
                rating: rated,
                updatedProduct
            }
        });

        dispatch({
            type: actionType.AVERAGE_RATING_SUCCESS,
            payload: {
                average
            }
        });
    } catch (error) {
        dispatch({
            type: actionType.RATE_ONE_ERROR,
            payload: error.message 
        });
    }
};

export const ratedProductList = (products, pages) => async (dispatch) => {
    try {
      dispatch({ type: actionType.RATED_LIST_REQUEST });
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }
      const response = await axios.get(`http://localhost:4444/rated-list?products=${products.toString()}&pages=${pages.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if(!response.data){
        throw new Error('Invalid response data');
    }
    
      const { foundRatedProducts } = response.data;

      dispatch({
        type: actionType.RATED_LIST_SUCCESS,
        payload: {
          foundRatedProducts,
          pages
        }
      });
    } catch (error) {
      dispatch({
        type: actionType.RATED_LIST_ERROR,
        payload: {
            error: error.response.data
        }
      });
    }
  };

export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }