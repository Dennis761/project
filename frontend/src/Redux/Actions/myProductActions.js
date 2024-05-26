import * as actionType from '../Constants/myProductConstants.js'
import axios from 'axios'

export const publishProduct = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post('http://localhost:4444/create-product',
        data,
         {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
 
        if(!response.data){
            throw new Error('Invalid response data');
        }

        const product = response.data;

        dispatch({
            type: actionType.PUBLISH_PRODUCT_SUCCESS,
            payload: {
                product
            }
        })

      } catch (error) {
        dispatch({
            type: actionType.PUBLISH_PRODUCT_ERROR,
            payload: {
                error: error.response.data
              }
        })
      }
}

export const getMyProduct = () => async (dispatch) => {
    try {
        dispatch({type: actionType.MY_PRODUCTS_REQUEST})
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.get('http://localhost:4444/show-my-products', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
  
        if(!response.data){
            throw new Error('Invalid response data');
        }

        const { foundProducts, message } = response.data;
  
        if (!foundProducts) {
            throw new Error(message); 
        }
  
        dispatch({
            type: actionType.MY_PRODUCTS_SUCCESS,
            payload: {
              foundProducts
          }
        });
    } catch (error) {
        dispatch({
            type: actionType.MY_PRODUCTS_ERROR,
            payload: error.message
        })
    }
};
 
export const editMyProduct = (id, editedProduct, onClose) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.patch(
          `http://localhost:4444/edit-product/${id}`,
            editedProduct,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if(!response.data){
            throw new Error('Invalid response data');
        }

        const {updatedProduct} = response.data

        if(!updatedProduct){
            return response.data
        }

        dispatch({
            type: actionType.EDIT_PRODUCT_SUCCESS,
            payload: {
                updatedProduct
            }
        })
        onClose()
      } catch (error) {
        dispatch({
            type: actionType.EDIT_PRODUCT_ERROR,
            payload: error.message
        })
      }
}

export const deleteMyProduct = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.delete(`http://localhost:4444/delete-product/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if(!response.data){
            throw new Error('Invalid response data');
        }
        
        const {removedId} = response.data

        if(!removedId){
            throw new Error('Failed to delete')
        }
 
        dispatch({
            type: actionType.DELETE_PRODUCT_SUCCESS,
            payload: {
                removedId: removedId
            }
        })

    } catch (error) {
        dispatch({
            type: actionType.DELETE_PRODUCT_ERROR,
            payload: error.message
        });
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
}