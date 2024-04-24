import {createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import { 
    cartReducer } from '../Redux/Reducers/cartReducer.js'
import {
    historyReducer } from '../Redux/Reducers/historyReducer.js'
import { 
    saveProductStateReducer, 
    savedProductsListReducer, 
    rateProductReducer,
    getRatedListReducer } from '../Redux/Reducers/productReducer.js'
import { 
    createProductReducer,
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
    cart: cartReducer,
    myProduct: myProductReducer,
    history: historyReducer,
    getProducts: getProductsReducer,
    saveProductState: saveProductStateReducer,
    savedProductsList: savedProductsListReducer,
    rateProduct: rateProductReducer,
    getProduct: getProductReducer,
    findProduct: findProductReducer,
    myProfile: myProfileReducer,
    getRatedList: getRatedListReducer,
    createNewUser: createNewUserReducer,
    userInfo: userInfoReducer,
    createProduct: createProductReducer
})

const middleWare = [thunk]

const store = createStore(
    reducer, 
    composeWithDevTools(applyMiddleware(...middleWare))
)

export default store