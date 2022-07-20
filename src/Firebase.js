import firebase from "firebase";
  
const firebaseConfig = {
    apiKey: "AIzaSyC1X_xZR6ZwtLD-7SkTcr_JYwq92S3C8-U",
    authDomain: "chatapp-85921.firebaseapp.com",
    projectId: "chatapp-85921",
    storageBucket: "chatapp-85921.appspot.com",
    messagingSenderId: "315855280685",
    appId: "1:315855280685:web:6727f9aac174332ed076a4"
};
  
 firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
  
export default firebase;
