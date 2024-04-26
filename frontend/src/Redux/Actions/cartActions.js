import * as actionType from '../Constants/cartConstants.js'
import axios from 'axios';

export const addItemToCart = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(
            `http://localhost:4444/add-to-cart`,
            { id },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if (!response.data.product) {
            throw new Error('Invalid response data');
        }

        const { product } = response.data;

        dispatch({
            type: actionType.ADD_TO_CART_SUCCESS,
            payload: {
                product
            }
        });
    } catch (error) {
        dispatch({
            type: actionType.ADD_TO_CART_ERROR,
            payload: {
                error: error.response
            }
        })
    }
};
 
export const getItemFromCart = () => async (dispatch) => {
    try { 
        dispatch({type: actionType.CART_LIST_REQUEST})
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:4444/add-to-cart-list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.data || !response.data.foundProducts) {
            throw new Error('Invalid response data');
        }

        const { foundProducts } = response.data;

        dispatch({
            type: actionType.CART_LIST_SUCCESS,
            payload:{
                foundProducts
            }
        })

    } catch (error) {
        dispatch({
            type: actionType.CART_LIST_ERROR,
            payload: {
                error: error.response
            }
        })
    }
};

export const removeItemFromCart = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(`http://localhost:4444/remove-from-cart`,
         { id }, 
         {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.data){
            throw new Error('Invalid response data');
        }

        const {removedId} = response.data

        dispatch({
            type: actionType.REMOVE_FROM_CART_SUCCESS, 
            payload: {
                removedId: removedId
             }
        });
    } catch (error) {
        dispatch({
            type: actionType.REMOVE_FROM_CART_ERROR,
            payload: {
                error: error.response
            }
        })
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }