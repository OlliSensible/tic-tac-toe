import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageData } from '../utils/local-storage';
import { loginData } from '../mocks/login-data';
import { useAuth } from './context/auth-context';
import './login.css';
import TextField from './registrations/text-field';
import { Player } from '../constants/Player';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, setAuthStatus } = useAuth();
  const eye = '\u{1F441}';
  const eyeInSpeechBubble = '\u{1F441}\u{200D}\u{1F5E8}\u{FE0F}';
  const [playerChoice, setPlayerChoice] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    const userExists = loginData.some(user => user.name === name && user.password === password);

    if (userExists) {
      setLocalStorageData('name', name);
      setLocalStorageData('playerChoice', playerChoice);
      setLocalStorageData('playerType', playerChoice); 
      setAuthStatus(true);
      navigate('/');
    } else {
      console.error('Invalid credentials, user not found.');
      setError('Invalid credentials, user not found.');
    }
  };

  const handlePlayerChoiceChange = (event) => {
    setPlayerChoice(event.target.value);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">Enter name and password</div>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <TextField
            label="Name"
            id="name"
            type="text"
            value={name}
            onChange={setName}
            className="password-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input-container">
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={setPassword}
              className="password-input"
            />
            <button
              className="password-toggle-button"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? eye : eyeInSpeechBubble}
            </button>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="player-choice">
          <p className="player-choice-question">Choose who you will play as: </p>
          <div className="player-choice-options">
            <label>
              <input
                type="radio"
                value="X"
                checked={playerChoice === Player.X}
                onChange={handlePlayerChoiceChange}
              />
              X
            </label>
            <label>
              <input
                type="radio"
                value="O"
                checked={playerChoice === Player.O}
                onChange={handlePlayerChoiceChange}
              />
              O
            </label>
          </div>
        </div>
        <button className="sign-in-button" onClick={handleSignIn}>
          Sign in
        </button>
      </div>
    </div>
  );
}

export default Login;