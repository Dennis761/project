import * as actionType from '../Constants/userConstants.js'
import {MY_PRODUCTS_SUCCESS} from '../Constants/myProductConstants.js'
import axios from 'axios'

export const getProfile = (userToken) => async (dispatch) => {
  try {
      dispatch({type: actionType.MY_PROFILE_REQUEST});
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await axios.get(`http://localhost:4444/get-profile/${userToken}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.data) {
          dispatch({
              type: actionType.MY_PROFILE_ERROR,
              payload: 'Profile not loaded'
          });
          return;
      }

      const {userInfo, foundProducts} = response.data;

      dispatch({
        type: actionType.MY_PROFILE_SUCCESS,
        payload: {
            profileData: userInfo,
        }
    });
    
      if(userToken === token){
          dispatch({
              type: MY_PRODUCTS_SUCCESS,
              payload: {
                  foundProducts,
                  rightsState: true
              }
          }); 
      } else {
        dispatch({
          type: MY_PRODUCTS_SUCCESS,
          payload: {
            rightsState: false
          }
      }); 
          dispatch({
              type: actionType.MY_PROFILE_SUCCESS,
              payload: {
                  foundProducts,
                  profileData: userInfo,
              }
          });
      }

  } catch (error) {
      dispatch({
          type: actionType.MY_PROFILE_ERROR,
          payload: error.message
      });
  }
};

export const editMyProfile = (data, onClose) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }
    const response = await axios.patch(
      `http://localhost:4444/edit-profile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: actionType.EDIT_PROFILE_SUCCESS,
      payload: {
        updatedProfile: response.data.user
      }
    }) 
    onClose()   
  } catch (error) {
    dispatch({
      type: actionType.EDIT_PROFILE_ERROR,
      payload: {
        error: error.response.data
      }
    })
  }
}
  
export const loginUser = (data, onLogin, navigate) => async (dispatch) => {
  try {
      const response = await axios.post('http://localhost:4444/auth/login', data);
      const { token, ...userData } = response.data;

      localStorage.setItem('token', token);

      if (response.data) {
          onLogin();
          navigate('/homepage');
      }
      
      dispatch({
          type: actionType.LOGIN_USER_SUCCESS,
          payload: {
              loginData: userData,
              headerAndFooterState: true
          }
      });
  } catch (error) {
      dispatch({
          type: actionType.LOGIN_USER_ERROR,
          payload: {
            error: error.response.data
          }
      });
  }
}

export const logout = (navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    dispatch({
      type: actionType.LOGOUT_USER_SUCCESS,
      payload: {
        headerAndFooterState: false
      }
  });

  if (token) {
    localStorage.removeItem('token');
    navigate('/login');

  } else {
    console.error('Token not found in localStorage');
  }
  } catch (error) {
    dispatch({
      type: actionType.LOGOUT_USER_ERROR,
      payload: {
          error: error.response ? error.response.data.message : 'Server error'
      }
  });
  }
}

export const createNewUser = (data, navigate) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:4444/auth/registration', data)
    if (response) {
      navigate('/login');
    }
    dispatch({
      type: actionType.CREATE_USER_SUCCESS,
      payload: {
        userData: response.data.userData
      }
    })
  } catch (error) {
    dispatch({
      type: actionType.CREATE_USER_ERROR,
      payload: {
        error: error.response.data
      }
    })
  }
}
  
export const clearError = () => async (dispatch) => {
  dispatch({type: actionType.CLEAR_ERROR})
}