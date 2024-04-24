import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import checkAuth from './Middlewares/CheckAuth.js'

import * as productControllers from './Controllers/productControllers.js'
import * as cartControllers from './Controllers/cartControllers.js'
import * as getProductControllers from './Controllers/getProductListControllers.js'
import * as myProductControllers from './Controllers/myProductControllers.js'
import * as userControllers from './Controllers/userControllers.js'
import * as historyControllers from './Controllers/historyControllers.js'

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

app.post('/auth/registration', userControllers.register)
app.post('/auth/login', userControllers.login)
app.get('/get-profile/:userToken', checkAuth, userControllers.getProfile)
app.patch('/edit-profile', checkAuth, userControllers.editProfile)

//Save Routes

app.patch('/saved-one', checkAuth, productControllers.saveOne)
app.patch('/remove-saved', checkAuth, productControllers.removeSaved)
app.get('/saved-list', checkAuth, getProductControllers.savedList)

//Rate Routes

app.patch('/rated-one', checkAuth, productControllers.rateOne)
app.get('/rated-list', checkAuth, getProductControllers.ratedList)

//Cart Routes

app.patch('/add-to-cart', checkAuth, cartControllers.addToCart);
app.patch('/remove-from-cart', checkAuth, cartControllers.removeFromCart);
app.get('/add-to-cart-list', checkAuth, cartControllers.cartList);

//History Routes
 
app.patch('/remove-from-history', checkAuth, historyControllers.removeFromHistoryList);
app.get('/history-list', checkAuth, historyControllers.getHistoryList);

//My Product Routes

app.get('/show-my-products', checkAuth, myProductControllers.showMyProducts)
app.post('/create-product', checkAuth, myProductControllers.createMyProduct)
app.patch('/edit-product/:id', checkAuth, myProductControllers.editMyProduct)
app.delete('/delete-product/:id', checkAuth, myProductControllers.deleteMyProduct)
 
//Get/Find other products Routes

app.get('/products', checkAuth, getProductControllers.getAllProducts)
app.get('/product/:productId', checkAuth, getProductControllers.getOneProduct)
app.get('/products/:title', checkAuth, getProductControllers.findAllProducts)

app.listen(PORT, (err) => {
  if(err){
    return err
  } else {
    return console.log(`Server running on PORT:${PORT}`)
  }
})
