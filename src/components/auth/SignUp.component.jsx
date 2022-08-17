import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../shared/InputGroup.shared';

import {
  createUserDocFromAuth,
  createUserDocFromEmailAndPassword,
} from '../../utils/firebase/firebase.config';

const SignUp = () => {
  const navigate = useNavigate();
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confPassword: '',
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confPassword } = formFields;

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      alert('please make sure your passwords is the same');
      return;
    }

    try {
      const { user } = await createUserDocFromEmailAndPassword(email, password);
      if (user) {
        await createUserDocFromAuth(user, { displayName });
      }
      setFormFields(defaultFormFields);
      setTimeout(() => {
        navigate('/sign-in');
      }, 500);
      /*****************************/
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('email already in use');
      } else if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters');
      } else {
        console.log('error while creating user from email and password', error.message);
      }
    }
  };

  return (
    <div className="form__container">
      <h1 className="form__heading">Sign up and enjoy shopping</h1>
      <form className="form__card" onSubmit={handleOnSubmit}>
        <InputGroup
          id="name"
          placeholder="full name"
          type="text"
          value={displayName}
          onChange={(e) => setFormFields({ ...formFields, displayName: e.target.value })}
          onShowPassword={(e) => e.preventDefault()}
        />
        <InputGroup
          id="email"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
          onShowPassword={(e) => e.preventDefault()}
        />

        <InputGroup
          id="password"
          placeholder="password"
          type={!showPassword ? 'password' : 'text'}
          value={password}
          onChange={(e) => setFormFields({ ...formFields, password: e.target.value })}
          onShowPassword={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        />
        <InputGroup
          id="confirm password"
          placeholder="confirm password"
          type={!showPassword ? 'password' : 'text'}
          value={confPassword}
          onChange={(e) => setFormFields({ ...formFields, confPassword: e.target.value })}
          onShowPassword={(e) => {
            e.preventDefault();
            setShowPassword((prev) => !prev);
          }}
        />
        <div className="form__cta">
          <button type="submit" className="btn form__btn-submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
