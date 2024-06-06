
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_STORAGE_BUCKET,AUTH_DOMAIN,PROJECT_ID,MESSAGING_SENDER_API } from '@env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
 storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_API ,
  appId: FIREBASE_APP_ID,
 
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const fbApp = getApp();
const db = getFirestore(fbApp);
const fbStorage = getStorage(fbApp);

const uploadPicture = async(uri, name, onProgress) =>{
  const response = await fetch(uri)
  const blob = await response.blob();
  console.log(blob);

  const storage = getStorage();
  const storageRef= ref(storage, `images/${name}`);

  const uploadTask = uploadBytesResumable(storageRef, blob);
  return new Promise((resolve, reject) => {
  uploadTask.on("state_changed",
      (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          onProgress && onProgress(progress);
      },
      (error) => {
          console.error(error);
          reject(error);
      },
      async () => {
          const downloadURL = getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          resolve({
              url: downloadURL,
              metatada: uploadTask.snapshot.metadata
          })
      }
  )
  })
}

export { fbApp, fbStorage, uploadPicture, db };
