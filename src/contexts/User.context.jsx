import { createContext, useEffect, useState } from 'react';
import {
  createUserDocFromAuth,
  onAuthStateChangeListener,
} from '../utils/firebase/firebase.config';

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//provider ==> the actual component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider displayName="AuthContext" value={value}>
      {children}
    </UserContext.Provider>
  );
};
