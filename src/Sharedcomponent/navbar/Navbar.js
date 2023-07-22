import React from 'react'
import '../navbar/Navbar.css'
import bcp from '../../assets/logo-gbp.svg'
const Navbar = () => {
  return (
    <nav>
    <div class="logo">
      <a href="#"><img src={bcp} /></a>
    </div>
    <div class="account">
      <a href="#">Créer un compte</a>
      <a href="#">Se connecter</a>
    </div>
  </nav>

  )
}

export default Navbar
