import React, { useState } from 'react';
import './Auth.styles.scss';

import InputGroup from '../shared/InputGroup.shared';

import {
  createUserDocFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.config';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSignInWithGoogle = async (e) => {
    e.preventDefault();
    const { user } = await signInWithGooglePopup();
    if (user) {
      const userDocRef = await createUserDocFromAuth(user);
      console.log(userDocRef.id, user.id);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
  };

  return (
    <div className="form__container">
      <form className="form__card" onSubmit={handleOnSubmit}>
        <div className="form__inputs">
          <InputGroup
            id="email"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onShowPassword={(e) => e.preventDefault()}
          />
          <InputGroup
            id="password"
            placeholder="password"
            type={!showPassword ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onShowPassword={(e) => {
              e.preventDefault();
              setShowPassword((prev) => !prev);
            }}
          />
        </div>

        <div className="form__cta">
          <button type="submit" className="btn">
            login
          </button>
          <button onClick={handleOnSignInWithGoogle} className="btn google-btn">
            &nbsp; login with google
          </button>
        </div>
        <h2 className="form__signUp-link">
          you don't have an account
          <span>
            <Link to="/sign-up" className="nav__link">
              sign-up
            </Link>
          </span>
          and enjoy shopping
        </h2>
      </form>
    </div>
  );
};

export default SignIn;
