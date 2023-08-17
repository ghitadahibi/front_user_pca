import queryString from 'query-string';
import {  addAdminToken ,addUserToken} from './reducers/rootReducer';
import { store } from '.';

//recuperation token pour login
  export const exchangeCodeForToken = async (code) => {
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
          redirect_uri: 'http://localhost:3001/',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error exchanging code for token: ${response.statusText}`);
      }
  
      const data = await response.json();
      const token = data.access_token;
    
      return token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return null;
    }
  };
  export const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await fetch('http://localhost:8080/realms/srs/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          grant_type: 'refresh_token',
          client_id: 'front-user',
          client_secret:'J5RDSc7Doy3MEnOqCxZylP9TsLgBoYQ8',
          refresh_token: refreshToken,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error refreshing access token: ${response.statusText}`);
      }
  
      const data = await response.json();
      const token = data.access_token;
  
      return token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return null;
    }
  };
  

  //recuperation token login
   export const Authenticate = async () => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', 'front-user');
      params.append('client_secret', 'J5RDSc7Doy3MEnOqCxZylP9TsLgBoYQ8');
  
      const response = await fetch('http://localhost:8080/realms/srs/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
  
      if (!response.ok) {
        throw new Error(`Erreur lors de l'authentification avec Keycloak: ${response.statusText}`);
      }
  
      const data = await response.json();
      const token= data.access_token;
      store.dispatch(addAdminToken(token));
      const state = store.getState();
      const adminTokens = state.adminTokens;
      console.log(adminTokens);
      return token
    } catch (error) {
      console.error('Erreur lors de l\'authentification avec Keycloak:', error);
    }
  };
  


