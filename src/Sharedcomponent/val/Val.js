import React from 'react';
import './Val.css';
import Image from '../../assets/private-lounge.jpg'
import Image2 from '../../assets/val.png'

const Val = () => {
  return (
    <div className="container">
       <p className="p">Pourquoi Nous Choisir </p>
      <div className="image-container">
       
        <img src={Image} alt="Image 1" />
        <img src={Image2} alt="Image 2" />
      </div>
    </div>
  );
}

export default Val;

