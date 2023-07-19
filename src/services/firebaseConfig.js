import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);

export const database = db;
export const auth = getAuth(app);

