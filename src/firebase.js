
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "xxxxxxxxxxxxxxxx",
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
