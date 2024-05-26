import * as actionType from '../Constants/getProductsListConstants.js';
 
export const getProductReducer = (state = { product: null, checkSavedProduct: null, isLoading: true, error: null, state: null }, action) => {
    switch (action.type) {
        case actionType.ONE_PRODUCT_REQUEST:
            return { 
                ...state,
                isLoading: true,
                product: null,
                ratedProduct: null,
                checkSavedProduct: null,
                userData: null,
            }; 
        case actionType.ONE_PRODUCT_SUCCESS:
            return { 
                ...state,
                isLoading: false,
                product: action.payload.updatedProduct,
                ratedProduct: action.payload.ratedProduct,
                userData: action.payload.userData,
            };
        case actionType.ONE_PRODUCT_ERROR:
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
}

export const getProductsReducer = (state = { productsList: [], isLoading: true, lineState: true, error: null }, action) => {
  switch (action.type) {
    case actionType.ALL_PRODUCTS_REQUEST:
      return { 
        ...state,
        isLoading: true,
        lineState: true,
        pages: null,
        error: null
      }; 
    case actionType.ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lineState: action.payload.productsList.length === 0? false : true,
        productsList: [...state.productsList, ...action.payload.productsList],
        pages: action.payload.pages? action.payload.pages + 1 : 1,
        error: null 
      };
    case actionType.ALL_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
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

export const findProductReducer = (state = { foundSetProducts: [], isLoading: true, error: null }, action) => {
    switch (action.type) {
        case actionType.FOUND_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionType.FOUND_PRODUCT_SUCCESS:
            const { foundProductsByTitle } = action.payload;
            return {
                ...state,
                isLoading: false,
                foundProductsByTitle
            };
        case actionType.FOUND_PRODUCT_ERROR:
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
