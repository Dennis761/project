import * as actionType from '../Constants/myProductConstants.js';

export const publishProductReducer = (state = {product: {}, error: null}, action) => {
    switch (action.type) {
        case actionType.PUBLISH_PRODUCT_SUCCESS:
            return {
                ...state,
                product: action.payload.product,
                error: null
            }

        case actionType.PUBLISH_PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload.error.errors
            };

        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: action.payload ? action.payload.error : null          
            };

        default:
            return state;
    }
}

export const myProductReducer = (state = { updatedList: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case actionType.MY_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                updatedList: []
            };

        case actionType.MY_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                updatedList: action.payload.foundProducts,
                rightsState: action.payload.rightsState
            };

        case actionType.MY_PRODUCTS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };

        case actionType.EDIT_PRODUCT_SUCCESS:
            const editedProduct = action.payload.updatedProduct;

            const updatedList = state.updatedList.map(obj => {
                return obj._id === editedProduct._id ? editedProduct : obj;
            });
            return {
                ...state,
                isLoading: false,
                updatedList
            };

        case actionType.EDIT_PRODUCT_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };

        case actionType.DELETE_PRODUCT_SUCCESS:
            const productId = action.payload.removedId;
            const newList = state.updatedList.filter(obj => obj._id !== productId);
            return {
                ...state,
                isLoading: false,
                updatedList: newList
            };

        case actionType.DELETE_PRODUCT_ERROR:
            return {
                ...state,
                isLoading: false,
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