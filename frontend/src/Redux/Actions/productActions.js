import * as actionType from '../Constants/productConstants.js';
import axios from 'axios';

export const saveProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(
            `http://localhost:4444/saved-one`,
            { id },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        const { savedId, saves } = response.data;

        dispatch({
            type: actionType.SAVE_PRODUCT_SUCCESS,
            payload: {
                savedId,
                saves,
                saveState: true,
            },
        });
 
    } catch (error) {
        dispatch({
            type: actionType.SAVE_PRODUCT_ERROR,
            payload: error
        })
    }
};

export const removeSavedProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(
            `http://localhost:4444/remove-saved`,
            { id },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const { removedId, saves } = response.data;
        dispatch({
            type: actionType.REMOVE_SAVED_SUCCESS,
            payload: {
                    removedId,
                    saves, 
                    saveState: false
                }
            })

    } catch (error) {
        dispatch({
            type: actionType.REMOVE_SAVED_ERROR,
            payload: error.message
        })
    }
};

export const getSavedProducts = (products, pages) => async (dispatch) => {
    try {
        dispatch({type: actionType.SAVED_PRODUCTS_REQUEST})
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.get(`http://localhost:4444/saved-list?products=${products.toString()}&pages=${pages.toString()}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const {savedProducts} = response.data
        
        if(!response.data){
            return
        }
        
        dispatch({
            type: actionType.SAVED_PRODUCTS_SUCCESS,
            payload: {
                savedProducts,
                pages
            }
        })
    } catch (error) {
        dispatch({
            type: actionType.SAVED_PRODUCTS_ERROR,
            payload: error
        })
    }
}
 
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

        const { average, rate } = response.data;
        
        dispatch({
            type: actionType.RATE_ONE_SUCCESS,
            payload: {
                rating: rate,
            }
        });

        dispatch({
            type: actionType.AVERAGE_RATING_SUCCESS,
            payload: {
                average: average
            }
        });
    } catch (error) {
        dispatch({
            type: actionType.RATE_ONE_ERROR,
            payload: error.message // Passing error message as payload
        });
    }
};

export const getRatedList = (products, pages) => async (dispatch) => {
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
        payload: error.message 
      });
    }
  };

export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }