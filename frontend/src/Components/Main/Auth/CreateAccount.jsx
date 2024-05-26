import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNewUser, clearError } from '../../../Redux/Actions/userActions.js';
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
            placeholder='Enter user name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
            {error && error.find(error => error.path === 'name')?.msg}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Gmail:</label>
          <input
            id="email"
            placeholder='Enter user Gmail'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
            {error && error.find(error => error.path === 'email')?.msg}
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Country:</label>
          <input
            id="country"
            placeholder='Enter user country'
            type='text'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
            {error && error.find(error => error.path === 'country')?.msg}
            </p>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            placeholder='Enter user password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.find(error => error.path === 'password')?.msg}
          </p>
        </div>
        <Link to='/login' style={{textDecoration: 'none'}}>
          If you have account. Login
          </Link>
        <Button variant="primary" onClick={submitNewUser}>Login</Button>
    </div>
  );
}
