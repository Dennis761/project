import * as actionType from '../Constants/historyConstants.js';

export const historyReducer = (state = { historyList: [], lineState: [], isLoading: null, pages: null, error: null }, action) => {
    switch (action.type) {
        case actionType.HISTORY_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            }

        case actionType.HISTORY_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                lineState: action.payload.historyList.length === 0? false : true,
                historyList: [...state.historyList, ...action.payload.historyList],
                pages: action.payload.pages? action.payload.pages + 1 : 1,
            }

        case actionType.HISTORY_LIST_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }

        case actionType.REMOVE_ONE_FROM_HISTORY_SUCCESS:
            const removed = action.payload.removedId
            const newHistory = state.historyList.filter(item => item._id !== removed)
            return {
                ...state,
                isLoading: false,
                historyList: newHistory
            }

        case actionType.REMOVE_ONE_FROM_HISTORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            }
        case actionType.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
            
        default:
            return state;
    }
}
