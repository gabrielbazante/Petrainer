import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCUj7rv7NP1S2rZdTcMqBhMW4UvIxludbw',
  authDomain: 'petrainer-9fde5.firebaseapp.com',
  databaseURL: 'https://petrainer-9fde5-default-rtdb.firebaseio.com',
  projectId: 'petrainer-9fde5',
  storageBucket: 'petrainer-9fde5.appspot.com',
  messagingSenderId: '979129407192',
  appId: '1:979129407192:ios:38d15b05cc9ee05f7fa9ad',
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export { app };
