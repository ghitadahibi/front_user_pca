import React from 'react';
import './Field_c.css';
import google from "../../assets/google.png";
import git from "../../assets/git.png";

 
const Field_c = () => {
  const handleGoogleAuth = () => {
    // handle Google authentication
  };

  const handleGithubAuth = () => {
    // 
  }
  return (
    <div className="auth-buttons">
      <div className="auth-divider">
        <hr className="auth-hr" />
        <span className="auth-or">or</span>
        <hr className="auth-hr" />
      </div>
      <button className="auth-button" onClick={handleGoogleAuth}>
        <img className="auth-icon" src={google} alt="Google Icon" />
        Continue with Google
      </button>
      <button className="auth-button" onClick={handleGithubAuth}>
        <img className="auth-icon" src={git} alt="Google Icon" />
        Continue with Github
      </button>
    </div>
  
  );
};

export default Field_c;