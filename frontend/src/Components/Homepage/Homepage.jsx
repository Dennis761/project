import React, { useState, useEffect } from 'react';
import FindProduct from "../FindProduct/FindProduct.jsx"
import './Homepage.css'; 

import image1 from '../../Images/HomeBackground1.jpg';
import image2 from '../../Images/HomeBackground2.jpg';
import image3 from '../../Images/HomeBackground3.jpg';
 
const Homepage = () => {
  const [backgroundImages] = useState([image1, image2, image3]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-page">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      />
      <div className="foreground-content">
        <h1>Antique store</h1>
        <p>Step into our antique store, where each item whispers a story from the past, inviting you to unravel its mysteries and cherish its timeless beauty.</p>
        <FindProduct/>
      </div>
    </div>
  );
};

export default Homepage