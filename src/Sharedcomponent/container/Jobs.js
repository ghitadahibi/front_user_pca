import React, { useState, useEffect } from 'react';
import '../container/Jobs.css';
import bcp from "../../assets/bcp.jpg"
import bcp6 from "../../assets/bcp6.jpg"
import BCP4 from "../../assets/BCP4.jpg"

const Jobs = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="image-slider">
        <img src={bcp} alt="Image 1" className={currentImage === 0 ? "active" : ""} />
        <img src={bcp6} alt="Image 2" className={currentImage === 1 ? "active" : ""} />
        <img src={BCP4} alt="Image 3" className={currentImage === 2 ? "active" : ""} />
      </div>
    </div>
  );
};

export default Jobs;