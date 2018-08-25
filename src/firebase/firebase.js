// Initialize Firebase
let firebase = require("firebase");

var config = {
  apiKey: "AIzaSyDZcjRbNoVX8gPK23GHSbwLLuEnIu4n1BA",
  authDomain: "burogu-desu.firebaseapp.com",
  databaseURL: "https://burogu-desu.firebaseio.com",
  projectId: "burogu-desu",
  storageBucket: "burogu-desu.appspot.com",
  messagingSenderId: "706496084952"
};
firebase.initializeApp(config);

const storageRef = firebase.storage();
export default storageRef;
