import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from './Components/Auth/Login.jsx'
import Homepage from './Components/Homepage/Homepage.jsx'
import PrivacyPolicy from './Components/Policy/PrivacyPolicy.jsx'
import Header from './Header/Header.jsx';
import Footer from './Footer/Footer.jsx';
import CreateAccount from './Components/Auth/CreateAccount.jsx';
import PublishProduct from './Components/ProductActions/PublishProduct.jsx';
import Product from './Components/GetProductActions/GetOne.jsx'
import GetAll from './Components/GetProductActions/GetAll.jsx'
import FoundProduct from './Components/GetProductActions/FoundProductList.jsx';
import SavedList from './Components/Saving/SavedList.jsx';
import RatedList from './Components/Rating/RatedList.jsx';
import Profile from './Components/Profile/Profile.jsx'
import HistoryList from './Components/History/HistoryList.jsx'
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
              <Route path='/product' element={<GetAll/>}/>
              <Route path='/product/:productId' element={<Product/>}/>
              <Route path='/publish-product' element={<PublishProduct/>}/>
              <Route path='/our-policy' element={<PrivacyPolicy/>}/>
              <Route path="/products/:title" element={<FoundProduct />} />
              <Route path="/saved-list" element={<SavedList/>} />
              <Route path="/rated-list" element={<RatedList/>} />
              <Route path="/profile/:userToken" element={<Profile/>} />
              <Route path="/foundproduct/:title" element={<FoundProduct/>}/>
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