import * as actionType from '../Constants/saveProductConstants.js';

const initialState = {
    savedProducts: [],
    isLoading: false,
    saveState: false,
    currentSaves: null,
    saved: null,
    checkSavedProduct: false,
    error: null,
    lineState: false,
};

export const saveProductStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SAVE_PRODUCT_SUCCESS:
            return {
                ...state,
                savedProducts: action.payload.foundProduct ? [action.payload.foundProduct, ...state.savedProducts]: state.savedProducts,
                checkSavedProduct: action.payload.checkSavedProduct,
                saveState: action.payload.saveState,
                currentSaves: action.payload.currentSaves,
                saved: action.payload.saved,
            };

        case actionType.REMOVE_SAVED_SUCCESS:
            return {
                ...state,
                savedProducts: state.savedProducts.filter(product => product._id !== action.payload.removedId),
                checkSavedProduct: action.payload.checkSavedProduct,
                saveState: action.payload.saveState,
                currentSaves: action.payload.currentSaves,
                saved: action.payload.saved,
            };
        case actionType.SAVE_PRODUCT_ERROR:
        case actionType.REMOVE_SAVED_ERROR:
            return {
                ...state,
                error: action.payload.error
            };

        case actionType.SAVED_PRODUCTS_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case actionType.SAVED_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lineState: action.payload.savedProducts.length === 0 ? false : true,
                savedProducts: [...state.savedProducts, ...action.payload.savedProducts],
                pages: action.payload.pages ? action.payload.pages + 1 : 1,
                error: null
            };

        case actionType.SAVED_PRODUCTS_LIST_ERROR:
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
