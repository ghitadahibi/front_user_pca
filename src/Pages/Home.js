import Navbar from "../Sharedcomponent/navbar/Navbar.js";
import Jobs from "../Sharedcomponent/container/Jobs.js"
import Cards from "../Sharedcomponent/cards/Cards.js"
import Val from "../Sharedcomponent/val/Val.js"
import Footer from "../Sharedcomponent/footer/Footer.js"
import React, { useState, useEffect,  useRef  } from 'react';
import Keycloak from 'keycloak-js';


const Home = () => {

  
  return (
    <div>
      <Navbar></Navbar>
      <Jobs></Jobs>
      <Cards></Cards>
      <Val></Val>
      <Footer></Footer>
    </div>
  )
}

export default Home

