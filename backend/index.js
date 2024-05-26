import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './Middlewares/CheckAuth.js'

import * as validator from './Validation/Validation.js'

import * as cartControllers from './Controllers/cartControllers.js'
import * as getProductControllers from './Controllers/getProductListControllers.js'
import * as historyControllers from './Controllers/historyControllers.js'
import * as myProductControllers from './Controllers/myProductControllers.js'
import * as rateProductControllers from './Controllers/rateProductControllers.js'
import * as saveProductControllers from './Controllers/saveProductControllers.js'
import * as userControllers from './Controllers/userControllers.js'

const app = express();
const PORT = 4444;
const db = 'mongodb+srv://millerden45:qetuo159@cluster0.ufrk5m5.mongodb.net/blog?retryWrites=true&w=majority';

app.use(cors())
app.use(express.json())

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.get('/', (req, res) => {
  res.send('Hello world!')
})

//User Routes

app.post('/auth/registration', validator.createUserValidator, userControllers.register)
app.post('/auth/login', userControllers.login)
app.get('/get-profile/:userToken', checkAuth, userControllers.getProfile)
app.patch('/edit-profile', checkAuth, userControllers.editProfile)

//Save Routes

app.patch('/saved-one', checkAuth, saveProductControllers.saveOne)
app.patch('/remove-saved', checkAuth, saveProductControllers.removeSaved)
app.get('/saved-list', checkAuth, saveProductControllers.savedList)

//Rate Routes

app.patch('/rated-one', checkAuth, rateProductControllers.rateOne)
app.get('/rated-list', checkAuth, rateProductControllers.ratedList)

//Cart Routes

app.patch('/add-to-cart', checkAuth, cartControllers.addToCart);
app.patch('/remove-from-cart', checkAuth, cartControllers.removeFromCart);
app.get('/add-to-cart-list', checkAuth, cartControllers.cartList);

//History Routes
 
app.patch('/remove-from-history', checkAuth, historyControllers.removeFromHistoryList);
app.get('/history-list', checkAuth, historyControllers.getHistoryList);

//My Product Routes

app.get('/show-my-products', checkAuth, myProductControllers.showMyProducts)
app.post('/create-product', validator.productValidator, checkAuth, myProductControllers.createMyProduct)
app.patch('/edit-product/:id', checkAuth, myProductControllers.editMyProduct)
app.delete('/delete-product/:id', checkAuth, myProductControllers.deleteMyProduct)
 
//Get/Find other products Routes

app.get('/products', checkAuth, getProductControllers.getAllProducts)
app.get('/products/:productId', checkAuth, getProductControllers.getOneProduct)
app.get('/found-products/:title', checkAuth, getProductControllers.findAllProducts)

app.listen(PORT, (err) => {
  if(err){
    return err
  } else {
    return console.log(`Server running on PORT:${PORT}`)
  }
})
