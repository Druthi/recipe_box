import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCJD6r2174xgOc9amTHR1UcK5eSZ5PFgXI",
    authDomain: "recipe-box-f8b28.firebaseapp.com",
    databaseURL: "https://recipe-box-f8b28.firebaseio.com",
    projectId: "recipe-box-f8b28",
    storageBucket: "",
    messagingSenderId: "349713907570"
  };
  firebase.initializeApp(config);
  console.log(firebase);

export default firebase;