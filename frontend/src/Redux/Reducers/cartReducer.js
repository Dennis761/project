import * as actionType from '../Constants/cartConstants.js';

export const cartReducer = (state = { isLoading: false, error: null, cartItems: [] }, action) => {
    switch (action.type) {
        case actionType.ADD_TO_CART_SUCCESS:
            const product = action.payload.product;
            const existItem = state.cartItems.find((x) => x._id === product._id);

            if (existItem) {
                const cartItems = state.cartItems.map((item) => item && (item._id === existItem._id) ? product : item)
                return {
                    ...state,
                    isLoading: false,
                    cartItems: cartItems
                };
            } else {
                return {
                    ...state,
                    isLoading: false,
                    cartItems: [...state.cartItems, product],
                };
            }
        case actionType.ADD_TO_CART_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };

        case actionType.REMOVE_FROM_CART_SUCCESS:
            const removed = action.payload.removedId
            const newList = state.cartItems.filter(item => item._id !== removed)

            return {
                ...state,
                isLoading: false,
                cartItems: newList
            }; 

        case actionType.REMOVE_FROM_CART_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };

        case actionType.CART_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case actionType.CART_LIST_SUCCESS:
            return { 
                ...state,
                isLoading: false,
                cartItems : action.payload.foundProducts
            };

        case actionType.CART_LIST_ERROR:
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
