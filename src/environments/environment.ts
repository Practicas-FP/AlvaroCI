// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  baseURLcomics: 'http:gateway.marvel.com/v1/public/comics?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c',
  baseURLcharacters: 'http:gateway.marvel.com/v1/public/characters?ts=1000&apikey=d227faa05f90f594c1959e2f56afef55&hash=b83e662f3ade20d32b8e5e4e80eb439c',
  
  firebaseConfig: {
    apiKey: 'AIzaSyCHSvfEuzPQwNNvvQYyx07ZL-21lTjH8uc',
    authDomain: 'marvel-30077.firebaseapp.com',
    projectId: 'marvel-30077',
    storageBucket: 'marvel-30077.appspot.com',
    messagingSenderId: '777534832823',
    appId: '1:777534832823:web:75d15e5ce94b3bf1eecd32',
    measurementId: 'G-8L0KWQ9QW5',
  },
};

// Initialize Firebase
/*const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);


 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
