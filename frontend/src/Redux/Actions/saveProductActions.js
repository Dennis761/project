import * as actionType from '../Constants/saveProductConstants.js';
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
        
        if(!response.data){
            throw new Error('Invalid response data');
        }

        const { foundProduct, currentSaves } = response.data;

        dispatch({
            type: actionType.SAVE_PRODUCT_SUCCESS,
            payload: {
                foundProduct,
                currentSaves,
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

        if(!response.data){
            throw new Error('Invalid response data');
        }

        const { removedId, currentSaves } = response.data;
        dispatch({
            type: actionType.REMOVE_SAVED_SUCCESS,
            payload: {
                    removedId,
                    currentSaves, 
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
        dispatch({type: actionType.SAVED_PRODUCTS_LIST_REQUEST})
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
            throw new Error('Invalid response data');
        }
        
        dispatch({
            type: actionType.SAVED_PRODUCTS_LIST_SUCCESS,
            payload: {
                savedProducts,
                pages
            }
        })
    } catch (error) {
        dispatch({
            type: actionType.SAVED_PRODUCTS_LIST_ERROR,
            payload: error
        })
    }
}
 
export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }