import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCVpFoja0KKGM1oyK-qSrtqrMD57Cn9dWY",
  authDomain: "house-marketplace-app-291cc.firebaseapp.com",
  projectId: "house-marketplace-app-291cc",
  storageBucket: "house-marketplace-app-291cc.appspot.com",
  messagingSenderId: "644757188697",
  appId: "1:644757188697:web:55d867c1e6026ae109c148"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)