import * as actionType from '../Constants/rateProductConstants.js';

const initialState = { 
  isLoading: false, 
  foundRatedProducts: [], 
  savedProductStatus: [],
  error: null}

export const rateProductStateReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.RATE_ONE_SUCCESS: {
        const { updatedProduct, rating, ratedProduct, pages } = action.payload;
        let updatedFoundRatedProducts = state.foundRatedProducts || [];
    
        if (updatedProduct) {
            const indexOfRatedProduct = updatedFoundRatedProducts.findIndex(item => item._id === updatedProduct._id);
            if (indexOfRatedProduct !== -1) {
                updatedFoundRatedProducts = [
                    ...updatedFoundRatedProducts.slice(0, indexOfRatedProduct),
                    updatedProduct,
                    ...updatedFoundRatedProducts.slice(indexOfRatedProduct + 1)
                ];
            } else {
                updatedFoundRatedProducts = [...updatedFoundRatedProducts, updatedProduct];
            }
        }
    
        return {
            ...state,
            rating,
            ratedProduct,
            foundRatedProducts: updatedFoundRatedProducts,
            pages: pages ? pages + 1 : 1,
            error: null,
        };
    }    
    
        case actionType.RATED_PRODUCTS_ERROR:
          return {
            ...state,
            error: action.payload.error 
          }

        case actionType.AVERAGE_RATING_SUCCESS:
          return {
            ...state,
            average: action.payload.average,
            averageRating: action.payload.averageRating,
            error: null,
          }

        case actionType.AVERAGE_RATING_ERROR:
          return {
            ...state,
            error: action.payload.error 
          }

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
            foundRatedProducts: [...state.foundRatedProducts, ...action.payload.foundRatedProducts],
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