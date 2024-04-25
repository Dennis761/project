import * as actionType from '../Constants/historyConstants.js'
import axios from 'axios'

export const getHistoryList = (products, pages) => async (dispatch) => {
    try {
        dispatch({type: actionType.HISTORY_LIST_REQUEST})
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }
        const response = await axios.get(`http://localhost:4444/history-list?products=${products.toString()}&pages=${pages.toString()}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if(!response.data){
            throw new Error('Invalid response data');
        }

        const {historyList} = response.data
        
        dispatch({
            type: actionType.HISTORY_LIST_SUCCESS,
            payload: {
                historyList,
                pages
            }
        }) 

    } catch (error) {
        dispatch({
            type: actionType.HISTORY_LIST_ERROR,
            payload: error
        })
    }
}

export const removeFromHistoryList = (id) => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`http://localhost:4444/remove-from-history`, 
        {id},
        {headers: {
            'Authorization': `Bearer ${token}`}})

        if(!response.data){
            throw new Error('Invalid response data');
        }

        const {removedId} = response.data
        dispatch({
            type: actionType.REMOVE_ONE_FROM_HISTORY_SUCCESS,
            payload: {
                removedId
            }
        })

        } catch (error) {
        dispatch({
            type: actionType.REMOVE_ONE_FROM_HISTORY_ERROR,
            payload: {
                type: actionType.HISTORY_LIST_ERROR,
                payload: {
                    error: error.response.data
                }
            }
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({type: actionType.CLEAR_ERROR})
  }