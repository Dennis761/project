import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { editMyProfile, clearError } from '../../Redux/Actions/userActions.js';
import './EditProfile.css';

const EditProfile = ({ onClose }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const {error} = useSelector(state => state.myProfile)

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error){
      console.error(error)
      dispatch(clearError())
    }
    const data = {
      name,
      email,
      country,
      avatarURL,
    }
    dispatch(editMyProfile(data, onClose))
  };

  return (
    <div className="edit-profile-container">
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          <h2>Name: </h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.find(error => error.path === 'name')?.msg}
          </p>
        </label>
        <label>
          <h2>Email:</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.find(error => error.path === 'email')?.msg}
          </p>
        </label>
        <label>
          <h2>Country:</h2>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter your country"
          />
          <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.find(error => error.path === 'country')?.msg}
          </p>
        </label>
        <label>
          <h2>Avatar URL:</h2>
          <input
            type="file"
            id="productImage"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result;
                  setAvatarURL(base64String);
                };
              reader.readAsDataURL(file);
            }}
         />
         <p style={{
            marginLeft: '20px',
            fontSize: '12px',
            color: 'red',
            whiteSpace: 'pre-line' 
          }}>
          {error && error.find(error => error.path === 'imageURL')?.msg}
          </p>
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditProfile;
