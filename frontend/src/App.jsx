import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Components/Main/Auth/Login.jsx';
import Homepage from './Components/Main/Homepage/Homepage.jsx';
import PrivacyPolicy from './Components/Main/Policy/PrivacyPolicy.jsx';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CreateAccount from './Components/Main/Auth/CreateAccount.jsx';
import PublishProduct from './Components/Main/ProductActions/PublishProduct.jsx';
import Product from './Components/Main/GetProductLists/GetOne.jsx'
import GetAll from './Components/Main/GetProductLists/GetAll.jsx'
import FoundProduct from './Components/Main/GetProductLists/FoundProductList.jsx';
import SavedList from './Components/Main/Saving/SavedList.jsx';
import RatedList from './Components/Main/Rating/RatedList.jsx';
import Profile from './Components/Main/Profile/Profile.jsx'
import HistoryList from './Components/Main/History/HistoryList.jsx'
import './bootstrap.min.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {headerAndFooterState} = useSelector(state => state.userInfo)

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <Router>
        {headerAndFooterState && <Header/>}
        <Routes>
          <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
          <Route path='/registration' element={<CreateAccount/>}/>
          {isLoggedIn && (
            <>
              <Route path='/homepage' element={<Homepage/>}/>
              <Route path='/products' element={<GetAll/>}/>
              <Route path='/products/:productId' element={<Product/>}/>
              <Route path='/publish-product' element={<PublishProduct/>}/>
              <Route path='/our-policy' element={<PrivacyPolicy/>}/>
              <Route path="/products/:title" element={<FoundProduct />} />
              <Route path="/saved-list" element={<SavedList/>} />
              <Route path="/rated-list" element={<RatedList/>} />
              <Route path="/profile/:userToken" element={<Profile/>} />
              <Route path="/found-products/:title" element={<FoundProduct/>}/>
              <Route path="/history" element={<HistoryList/>}/>
            </>
          )}
        </Routes>
        {headerAndFooterState && <Footer/>}
      </Router>
    </>
  );
}

export default App