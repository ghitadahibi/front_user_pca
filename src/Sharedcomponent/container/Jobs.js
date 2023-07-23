import React, { useState, useEffect } from 'react';
import '../container/Jobs.css';
import bcp from "../../assets/bcp.jpg"
<<<<<<< HEAD
import bcp12 from "../../assets/bcp12.jpeg"
import bcp13 from "../../assets/bcp13.jpg"
=======
import bcp6 from "../../assets/bcp6.jpg"
import BCP4 from "../../assets/BCP4.jpg"
>>>>>>> 594fe357ba8866633917396a9a8b359ec7dfecf1

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
<<<<<<< HEAD
        <img src={bcp12} alt="Image 2" className={currentImage === 1 ? "active" : ""} />
        <img src={bcp13} alt="Image 3" className={currentImage === 2 ? "active" : ""} />
=======
        <img src={bcp6} alt="Image 2" className={currentImage === 1 ? "active" : ""} />
        <img src={BCP4} alt="Image 3" className={currentImage === 2 ? "active" : ""} />
>>>>>>> 594fe357ba8866633917396a9a8b359ec7dfecf1
      </div>
    </div>
  );
};

export default Jobs;