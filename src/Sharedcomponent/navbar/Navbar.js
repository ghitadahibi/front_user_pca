import '../navbar/Navbar.css'
import bcp from '../../assets/logo-gbp.svg'
import { Link } from 'react-router-dom'
import React, { useState, useEffect,  useRef  } from 'react';
import queryString from 'query-string';
const Navbar = () => {
 
  
  return (
    <nav>
    <div class="logo">
      <a href="#"><img src={bcp} /></a>
    </div>
    <div class="account">
      <Link to='/compte'>
       Créer un compte
      </Link>
      <Link to='http://localhost:8080/realms/srs/protocol/openid-connect/auth?client_id=front-user&response_type=code'>
        Se connecter
      </Link>
      
    </div>
  </nav>

  )
}

export default Navbar
