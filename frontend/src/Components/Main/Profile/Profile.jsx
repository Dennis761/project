import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from '../../../Redux/Actions/userActions.js';
import EditProfile from './EditProfile.jsx';
import ScrollMenu from '../../ProductModels/ScrollMenuList.jsx';
import useInternetState from '../../Hooks/useInternetState.jsx';
import Alert from 'react-bootstrap/Alert';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { userToken } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, foundProducts, isLoading, error } = useSelector(state => state.myProfile);
  const { updatedList, state } = useSelector(state => state.myProduct);

  const isOnline = useInternetState()

  useEffect(() => {
    if(error){
      console.error(error)
      dispatch(clearError())
    }

    dispatch(getProfile(userToken));
  }, [dispatch, userToken]);
  

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleEditProfileClose = () => {
    setIsEditing(false);
  };

  return ( 
    <>
      {!isOnline ? (
        <Alert variant='warning' style={{margin: '5vh 5vh'}}>
          <b>Check Your Internet Connection...</b>
        </Alert>
      ) : (
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : ( 
          <>
            <div className="profile">
              {profileData ? (
                <>
                  <img src={profileData.avatarURL} alt="User" className="profile-image" />
                  <div className="profile-details">
                    <h2>{profileData.name}</h2>
                    <p>Email: {profileData.email}</p>
                    <p>Country: {profileData.country}</p>
                  </div>
                </>
              ) : (
                <div>Error: User information not available</div>
              )}
            </div>
            <h1 style={{ textAlign: 'center' }}>
              {state ? 'My Products:' : 'User Products:'}
            </h1>
            <ScrollMenu items={state ? updatedList : foundProducts} isLoading={isLoading} state={state} />
            <div className='edit-button-container'>
              {state && (
                <button className="edit-button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
            {isEditing && <EditProfile onClose={handleEditProfileClose} />}
          </>
        )
      )}
    </>
  );
}    
  

export default Profile
