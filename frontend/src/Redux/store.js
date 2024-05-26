import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { 
    cartReducer } from '../Redux/Reducers/cartReducer.js'

import {
    historyReducer } from '../Redux/Reducers/historyReducer.js'
import { 
    saveProductStateReducer} from '../Redux/Reducers/saveProductReducer.js'
import { 
    rateProductStateReducer} from '../Redux/Reducers/rateProductReducer.js'
import { 
    publishProductReducer,
    myProductReducer } from '../Redux/Reducers/myProductReducer.js'
import { 
    getProductReducer, 
    getProductsReducer, 
    findProductReducer } from '../Redux/Reducers/getProductsListReducer.js'
import { 
    myProfileReducer, 
    createNewUserReducer, 
    userInfoReducer } from '../Redux/Reducers/userReducer.js'
 
const reducer = combineReducers({
    userInfo: userInfoReducer,
    cart: cartReducer,
    myProduct: myProductReducer,
    myProfile: myProfileReducer,
    history: historyReducer,
    getProducts: getProductsReducer,
    getProduct: getProductReducer,
    findProduct: findProductReducer,
    saveProductState: saveProductStateReducer,
    rateProductState: rateProductStateReducer,
    createNewUser: createNewUserReducer,
    publishProduct: publishProductReducer
})

const middleWare = [thunk]

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store