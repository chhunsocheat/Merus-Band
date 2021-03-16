import firebase from "firebase"
import 'firebase/storage'
import firestore from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDMv2s9HaAzocq-KwR3eIdtc-UUaq5ujhc",
  authDomain: "band-quest.firebaseapp.com",
  databaseURL: "https://band-quest.firebaseio.com",
  projectId: "band-quest",
  storageBucket: "band-quest.appspot.com",
  messagingSenderId: "417848685126",
  appId: "1:417848685126:web:90402c6889e707d8d89047",
  measurementId: "G-81LK9KC8SJ"
};
  firebase.initializeApp(firebaseConfig);
//analytics is optional for this tutoral 
  firebase.analytics();
  //export firestore database
  const storage = firebase.storage()
  export  {
    storage, firebase as default
  }