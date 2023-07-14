import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3VpSwCFhQktVYJfZ5a2XFNn8D28ENls",
  authDomain: "fir-demo-77ee7.firebaseapp.com",
  projectId: "fir-demo-77ee7",
  storageBucket: "fir-demo-77ee7.appspot.com",
  messagingSenderId: "246679059556",
  appId: "1:246679059556:web:a271fce65269c891597371"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


