//import firebase models
import { initializeApp } from 'firebase/app';

/************** for auth ****************/
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

/************** for firestore ****************/
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// crwnClothing Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYHjwX3OKLpCU1JVNbGlWYKXNHZFDmghY',
  authDomain: 'projectsdb-5dfb1.firebaseapp.com',
  projectId: 'projectsdb-5dfb1',
  storageBucket: 'projectsdb-5dfb1.appspot.com',
  messagingSenderId: '441219483177',
  appId: '1:441219483177:web:5cf55032271ae8499dbe38',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//firebase auth
const provider = new GoogleAuthProvider();

provider.getCustomParameters({
  prompt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//firebase firestore db
const db = getFirestore();

//firebase db ====> collection(name)==>doc(ref)=>data(fields)
//create users collection
export const createUserDocFromGoogleAuth = async (userAuth) => {
  try {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    //if user data exists =>return userDocRef
    //else create user /set the doc in users collection
    if (!userSnapshot.exists()) {
      try {
        const createdAt = new Date();
        const { displayName, email } = userAuth;
        //add/set user doc to users collection
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    return userDocRef;
    /****************************************/
  } catch (error) {
    console.log('no doc', error.message);
  }
};
