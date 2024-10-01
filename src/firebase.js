// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDh-3_KqQDW7hrbaGXB0jvQ_dUv7rihUL0",
	authDomain: "connectiondb-1a078.firebaseapp.com",
	projectId: "connectiondb-1a078",
	storageBucket: "connectiondb-1a078.appspot.com",
	messagingSenderId: "212060324662",
	appId: "1:212060324662:web:f152013e1d06c3a4f52997",
	measurementId: "G-K7CFWHRWT1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
