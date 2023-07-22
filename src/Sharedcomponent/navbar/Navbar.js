import React from 'react'
import '../navbar/Navbar.css'
import bcp from '../../assets/logo-gbp.svg'
import { Link } from 'react-router-dom'
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
      <Link to='/connexion'>
        Se connecter
      </Link>
    </div>
  </nav>

  )
}

export default Navbar
