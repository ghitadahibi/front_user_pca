import React from 'react';
import './Val.css';
import Image from '../../assets/private-lounge.jpg';


const Val = () => {
  return (
    <div className="container">
      <div className="image-container">
        <p className="p">Pourquoi Nous Choisir </p>
        <img src={Image} alt="Image 1" />
      </div>
      
    </div>
  );
}

export default Val;