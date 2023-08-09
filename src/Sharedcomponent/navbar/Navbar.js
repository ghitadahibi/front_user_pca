import '../navbar/Navbar.css'
import bcp from '../../assets/logo-gbp.svg'
import { Link } from 'react-router-dom'
import React, { useState, useEffect,  useRef  } from 'react';
import queryString from 'query-string';
const Navbar = () => {
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    const code = params.code;
    //console.log(code);
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);
  const [accessTokens, setAccessTokens] = useState([]);

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('http://localhost:8080/realms/srs/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          grant_type: 'authorization_code',
          client_id: 'front-user',
          client_secret:'J5RDSc7Doy3MEnOqCxZylP9TsLgBoYQ8',
          code: code,
          redirect_uri: 'http://localhost:3001/', // Replace with your redirect URL
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error exchanging code for token: ${response.statusText}`);
      }
  
      const data = await response.json();
      const accessToken = data.access_token;
      setAccessTokens(prevAccessTokens => [...prevAccessTokens, accessToken]);
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };
  
  useEffect(() => {
    if (accessTokens.length > 0) {
      console.log(accessTokens[0]);
    }
  }, [accessTokens]);
  
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
