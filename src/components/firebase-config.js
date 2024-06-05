
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDjXN9fYyW6bIEcbNu-_DjeUVhJTmG0xOQ",
  authDomain: "cafeteria-support.firebaseapp.com",
  projectId: "cafeteria-support",
  storageBucket: "cafeteria-support.appspot.com",
  messagingSenderId: "344288739919",
  appId: "1:344288739919:web:a978749a28a1217ee6e03a",
 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
