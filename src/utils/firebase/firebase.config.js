//import firebase models
import { initializeApp } from 'firebase/app';

/************** for auth ****************/
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

/************** for firestore ****************/
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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
export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.getCustomParameters({
  prompt: 'select_account',
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

//firebase firestore db
const db = getFirestore();

/*********** save data to firestore database **************/
export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

/*********** retrieve data to firestore database **************/
export const getCatagoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const req = query(collectionRef);
  const querySnapshot = await getDocs(req);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

//firebase db ====> collection(name)==>doc(ref)=>data(fields)
//create users collection and add user doc from auth info
export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
  try {
    if (!userAuth) return;

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
          ...additionalInformation,
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

//create users collection from provided email and password
export const createUserDocFromEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// signIn with firebase signInWithEmailAndPassword method

export const userSignInWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

//user signOut with firebase signOut method
export const userSignOut = async () => {
  return await signOut(auth);
};

// auth state observer
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);
