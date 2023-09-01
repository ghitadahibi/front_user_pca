import '../navbar/Navbar.css'
import  {  useEffect  } from 'react';
import bcp from '../../assets/logo-gbp.svg'
import { Link } from 'react-router-dom'
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { exchangeCodeForToken } from '../../Auth';
import {refreshAccessToken} from '../../Auth';
import {  addUserToken } from '../../reducers/rootReducer';
import { store } from '../..';
import { useNavigate } from 'react-router-dom';
import { clearUserTokens } from '../../reducers/rootReducer';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
const urlParams = new URLSearchParams(location.search);
const code = urlParams.get('code');
const refreshToken = urlParams.get('refresh_token');
  const userTokens = useSelector(state => state.userTokens);

  useEffect(() => {
    if (code) {
      exchangeCodeForToken(code)
        .then(({ token, refreshToken }) => {
          if (token) {
            store.dispatch(addUserToken(token));
            console.log('Le token est présent dans le store:', token);
            console.log('userTokens:', store.getState().userTokens);
  
            // Store the refresh token for future use
      
          }
        })
        .catch((error) => {
          console.error('Error exchanging code for token:', error);
          return;
        });
    } else if (refreshToken) {
      // use the refresh token to get a new access token
      refreshAccessToken(refreshToken)
        .then(({ token}) => {
          if (token) {
            store.dispatch(addUserToken(token));
            console.log('le refresh:', token);
            console.log('userTokensrefresh:', store.getState().userTokens);

          }
        })
        .catch((error) => {
          console.error('Error refreshing access token:', error);
          return;
        });
    }
  }, [dispatch, refreshToken]);
  

  const handleLogout = () => {
    dispatch(clearUserTokens());
    navigate('/');
  };

  return (
    <nav>
      <div className="logo">
        <a href="#"><img src={bcp} /></a>
      </div>
      {userTokens.length > 0 ? (
        <div className="account">
          <button className="new" onClick={handleLogout}>Déconnecter</button>
        </div>
      ) : (
        <div className="account">
          <Link to="/compte">Créer un compte</Link>
          <Link to="http://localhost:8080/realms/srs/protocol/openid-connect/auth?client_id=front-user&response_type=code">
            Se connecter
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;