import React from 'react';
import './SignIn.styles.scss';

import {
  signInWithGooglePopup,
  createUserDocFromGoogleAuth,
} from '../../utils/firebase/firebase.config';

const SignIn = () => {
  const handleOnSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromGoogleAuth(user);
    console.log(userDocRef.id, user.id);
  };

  return (
    <div>
      <button onClick={handleOnSignIn}>sign in with google</button>
    </div>
  );
};

export default SignIn;
