import React from 'react'
import '../inputs/input.css'
const inputs = () => {
  return (
    <div>
            
    <form>
      <input type="email" className="input-email" placeholder="Email adresse" />
      <input type="password" className="input-pwd" placeholder="Mot de passe" />
      <input type="password" className="input-pwd" placeholder="Valider votre Mot de passe" />
      <input type="submit" value="Créer Compte" className="submit-btn" />
    </form>
    </div>
  )
}

export default inputs
