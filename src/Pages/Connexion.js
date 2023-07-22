import React from 'react'
import Signin from "../Sharedconnexion/signin/Signin"
import Field from "../Sharedconnexion/field/Field"
import Auth from "../Sharedconnexion/auth/Auth"
const Connexion = () => {
  return (
    <div>
      <Signin></Signin>
      <Field></Field>
      <Auth></Auth>

    </div>
  )
}

export default Connexion
