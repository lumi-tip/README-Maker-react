import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCIWlaXBFTpPnRPVe49WO7YCWM-SYdxcWQ",
  authDomain: "playground-cadc4.firebaseapp.com",
  databaseURL: "https://playground-cadc4-default-rtdb.firebaseio.com",
  projectId: "playground-cadc4",
  storageBucket: "playground-cadc4.appspot.com",
  messagingSenderId: "988917091966",
  appId: "1:988917091966:web:d804c1f3b9d1dace86d22f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, 'notes');