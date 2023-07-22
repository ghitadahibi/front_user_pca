import React, { useState, useEffect } from 'react';
import '../container/Jobs.css';
import bcp1 from "../../assets/bcp1_new.png"
import bcp2 from "../../assets/BCP2.jpg"
import bcp3 from "../../assets/bcp3.jpg"

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
        <img src={bcp1} alt="Image 1" className={currentImage === 0 ? "active" : ""} />
        <img src={bcp2} alt="Image 2" className={currentImage === 1 ? "active" : ""} />
        <img src={bcp3} alt="Image 3" className={currentImage === 2 ? "active" : ""} />
      </div>
    </div>
  );
};

export default Jobs;