import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Auth.styles.scss';
import InputGroup from '../shared/inputGroup/InputGroup.shared';

import {
  signInWithGooglePopup,
  userSignInWithEmailAndPassword,
} from '../../utils/firebase/firebase.config';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSignInWithGoogle = async (e) => {
    e.preventDefault();
    await signInWithGooglePopup();
    setTimeout(() => {
      navigate('/shop');
    }, 250);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await userSignInWithEmailAndPassword(email, password);

      setTimeout(() => {
        navigate('/shop');
      }, 250);
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        alert('wrong password');
      } else if (error.code === 'auth/user-not-found') {
        alert('user not found');
      } else {
        console.log(error.message);
      }
    }
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

          <button onClick={handleOnSignInWithGoogle} className="btn btn__google">
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
