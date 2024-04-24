import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNewUser, clearError } from '../../Redux/Actions/userActions.js';
import Button from 'react-bootstrap/Button';
import './Auth.css';
 
export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.createNewUser);

  const submitNewUser = () => {
    if(error){
      console.error(error)
      dispatch(clearError())
  }
    const data = {name, email, country, password}
    dispatch(createNewUser(data, navigate))
  }
 
  return (
    <div className='profile-container'>
      <h2>Registration</h2>
        <div className="form-group">
          <label htmlFor="email">User name:</label>
          <input
            id="name"
            placeholder='Input user name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Gmail:</label>
          <input
            id="email"
            placeholder='Input user Gmail'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Country:</label>
          <input
            id="country"
            placeholder='Input user country'
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            placeholder='Input user password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href='/login' style={{textDecoration: 'none'}}>If you have account. Login</a>
        <Button variant="primary" onClick={submitNewUser}>Login</Button>
    </div>
  );
}
