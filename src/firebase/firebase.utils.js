import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyBlT59yyg4xVSEJ49aifmTF0oGa7sjIwtU",
    authDomain: "ecommerce-db-e963c.firebaseapp.com",
    databaseURL: "https://ecommerce-db-e963c.firebaseio.com",
    projectId: "ecommerce-db-e963c",
    storageBucket: "",
    messagingSenderId: "296029416806",
    appId: "1:296029416806:web:4013dca8deb8c854d26ca7",
    measurementId: "G-F72K91BCJM"
  };
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
   
    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user',error.message);
        }
    }
    return userRef;
}
  firebase.initializeApp(config);

  export const auth = firebase.auth();

  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({propt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;