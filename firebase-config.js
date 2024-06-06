import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID
} from '@env';
import { initializeApp, getApp, getApps } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
//   databaseURL: 'https://project-id.firebaseio.com',
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: 'sender-id',
  appId: FIREBASE_APP_ID,
//   measurementId: 'G-measurement-id',
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const fbApp = getApp();
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

export { fbApp, fbStorage, uploadPicture };
