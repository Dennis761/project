import * as actionType from '../Constants/userConstants.js';

export const myProfileReducer = (state = { isLoading: false, profileData: {}, foundProducts: [], error: null, state: null }, action) => {
    switch (action.type) {
        case actionType.MY_PROFILE_REQUEST:
            return {
                ...state,
                isLoading: true,
                state: null,
                foundProducts: []
            }; 
        case actionType.MY_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profileData: action.payload.profileData,
                foundProducts: action.payload.foundProducts,
                state: action.payload.state
            };
        case actionType.MY_PROFILE_ERROR:
            return {
                ...state,
                isLoading: false, 
                state: action.payload.state,
                error: action.payload.error 
            };
        case actionType.EDIT_PROFILE_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                state: true,
                profileData: action.payload.updatedProfile,
                foundProducts: action.payload.foundProducts
            };
        case actionType.EDIT_PROFILE_ERROR:
            return {
                ...state,
                isLoading: false,
                state: true, 
                error: action.payload.error 
            };
        default:
            return state;
    }
}

export const createNewUserReducer = (state = { userData: {}, error: null}, action) => {
    switch (action.type) {
        case actionType.CREATE_USER_SUCCESS:
                return {
                    ...state,
                    userData: action.payload.userData,
                    error: null
                }
        case actionType.CREATE_USER_ERROR:
            return {
                ...state,
                error: action.payload.error 
            };
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
        }
}

export const userInfoReducer = (state = { loginData: {}, error: null }, action) => {
    switch (action.type) {
        case actionType.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loginData: action.payload.loginData,
                headerAndFooterState: action.payload.headerAndFooterState,
                error: null
            };
        case actionType.LOGIN_USER_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case actionType.LOGOUT_USER_SUCCESS:
            return {
                ...state,
                headerAndFooterState: action.payload.headerAndFooterState,
                error: null
            };
        case actionType.LOGOUT_USER_ERROR:
            return {
                ...state,
                error: action.payload.error
            };
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
