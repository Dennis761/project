import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser, clearError } from '../../../Redux/Actions/userActions';
import Button from 'react-bootstrap/Button';
import './Auth.css';

export default function Login({onLogin}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {error} = useSelector(state => state.userInfo)
  const navigate = useNavigate();

  const submitUser = (e) => {
    e.preventDefault(); 
    if(error){
      console.error(error)
      dispatch(clearError())
    }
    const data = {email, password}
    dispatch(loginUser(data, onLogin, navigate))
  };
 
  return (
    <div className='profile-container'>
      <h2>Login</h2>
      <form > 
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder='Enter your Gmail'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            placeholder='Enter your password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Link to='/registration' style={{textDecoration: 'none'}}>
          Don't have account? Create account
          </Link>
        <Button variant="primary" onClick={submitUser}>Login</Button>
        <p style={{
            textAlign: 'center',
            fontSize: '20px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.message}
          </p>
      </form>
    </div>
  );
}
