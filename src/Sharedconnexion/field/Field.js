import React from 'react'
import '../field/Field.css'
const Field = () => {
  return (
    <div>
      
    <form>
      <input type="email" className="input-email" placeholder="Email adresse" />
      <input type="password" className="input-pwd" placeholder="Mot de passe" />
    </form>
 
  </div>
  )
}

export default Field
