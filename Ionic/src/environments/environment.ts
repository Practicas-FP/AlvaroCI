// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  firebase: {
    projectId: 'marvel-30077',
    appId: '1:777534832823:web:75d15e5ce94b3bf1eecd32',
    databaseURL: 'https://marvel-30077-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'marvel-30077.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyCHSvfEuzPQwNNvvQYyx07ZL-21lTjH8uc',
    authDomain: 'marvel-30077.firebaseapp.com',
    messagingSenderId: '777534832823',
    measurementId: 'G-8L0KWQ9QW5',
  },
  production: false
};

const firebaseApp = initializeApp(environment.firebase);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

