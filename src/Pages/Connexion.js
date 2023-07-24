import React from 'react'
import Signin from "../Sharedconnexion/signin/Signin"
import Field from "../Sharedconnexion/field/Field"
import Auth from "../Sharedconnexion/auth/Auth"
import Gogit from '../Sharedconnexion/gogit/gogit'
const Connexion = () => {
  return (
    <div>
      <Signin></Signin>
      <Field></Field>
      <Auth></Auth>
      <Gogit></Gogit>

    </div>
  )
}

export default Connexion
