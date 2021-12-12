

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBImjlKUSaMn5Djw-i6dS3rAWRSABpP2Tk",
    authDomain: "movies-upload-images.firebaseapp.com",
    projectId: "movies-upload-images",
    storageBucket: "movies-upload-images.appspot.com",
    messagingSenderId: "816149761340",
    appId: "1:816149761340:web:8bc4001f039e6ea461e239",
    measurementId: "${config.measurementId}"
};
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
