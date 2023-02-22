import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
	apiKey: "AIzaSyCIEdQiqq8SeKchpNsl-CHzJgJShox0cOE",
	authDomain: "ushop-7a366.firebaseapp.com",
	projectId: "ushop-7a366",
	storageBucket: "ushop-7a366.appspot.com",
	messagingSenderId: "488754902258",
	appId: "1:488754902258:web:85fb25bb7f51326e140c6b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
