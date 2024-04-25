import * as actionType from '../Constants/productConstants.js';

export const saveProductStateReducer = (state = { saveState: false, saves: null, saved: null, checkSavedProduct: false, error: null }, action) => {
    switch (action.type) {
        case actionType.SAVE_PRODUCT_SUCCESS:
        case actionType.REMOVE_SAVED_SUCCESS:
            return { 
                ...state,
                checkSavedProduct: action.payload.checkSavedProduct,
                saveState: action.payload.saveState,
                saves: action.payload.saves,
                saved: action.payload.saved
            }; 
        case actionType.SAVE_PRODUCT_ERROR:
        case actionType.REMOVE_SAVED_ERROR:
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

export const savedProductsListReducer = (state = { savedProducts: [], isLoading: false, error: null }, action) => {
    switch (action.type) {
        case actionType.SAVED_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionType.SAVED_PRODUCTS_SUCCESS:
            return { 
                ...state,
                isLoading: false,
                lineState: action.payload.savedProducts.length === 0? false : true,
                savedProducts: [...state.savedProducts, ...action.payload.savedProducts],
                pages: action.payload.pages? action.payload.pages + 1 : 1,
                error: null
            };
        case actionType.SAVED_PRODUCTS_ERROR:
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

export const rateProductReducer = (productState = { savedProductStatus: [] }, action) => {
    switch (action.type) {
        case actionType.RATE_ONE_SUCCESS:
            return {
                ...productState,
                rating: action.payload.rating,
                ratedProduct: action.payload.ratedProduct,
                error: null
            };
        case actionType.RATED_PRODUCTS_ERROR:
            return {
                ...productState,
                error: action.payload.error 
            }
        case actionType.AVERAGE_RATING_SUCCESS:
            return {
                ...productState,
                average: action.payload.average,
                averageRating: action.payload.averageRating,
                error: null,
            }
        case actionType.AVERAGE_RATING_ERROR:
            return {
                ...productState,
                error: action.payload.error 
            }
        case actionType.CLEAR_ERROR:
            return {
                ...productState,
                error: null
            };
        default:
            return productState;
    }
};

export const ratedProductListReducer = (state = { isLoading: false, foundRatedProducts: [], error: null }, action) => {
    switch (action.type) {
      case actionType.RATED_LIST_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case actionType.RATED_LIST_SUCCESS:
        return {
          ...state,
          isLoading: false,
          lineState: action.payload.foundRatedProducts.length === 0? false : true,
          foundRatedProducts: [...state.foundRatedProducts, 
            ...action.payload.foundRatedProducts],
          pages: action.payload.pages? action.payload.pages + 1 : 1,
          error: null,
        };
      case actionType.RATED_LIST_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case actionType.CLEAR_ERROR:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };