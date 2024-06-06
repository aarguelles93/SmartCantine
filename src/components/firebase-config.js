
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_STORAGE_BUCKET,AUTH_DOMAIN,PROJECT_ID,MESSAGING_SENDER_API } from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
 storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_API ,
  appId: FIREBASE_APP_ID,
 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
