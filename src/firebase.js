import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration

// Initialize Firebase

//note --->its not working for version update so we are using direct credential thats not secure

//const app = initializeApp({
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASE_URL
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID
  
//});


const app = initializeApp({
    apiKey: "AIzaSyD8S9CYaOZvh_UCxGYHiMrk2kCjXYObFpM",
    authDomain: "react-quiz-dev-784e4.firebaseapp.com",
    databaseURL: "https://react-quiz-dev-784e4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-quiz-dev-784e4",
    storageBucket: "react-quiz-dev-784e4.appspot.com",
    messagingSenderId: "972560815679",
    appId: "1:972560815679:web:17b9605b5dcc19285f8a8a"
});

export default  app;