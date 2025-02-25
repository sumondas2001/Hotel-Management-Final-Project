import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvbmMSQtUtnT0DaU61NHc9eVVU6YpNCqg",
  authDomain: "hotel-management-51454.firebaseapp.com",
  projectId: "hotel-management-51454",
  storageBucket: "hotel-management-51454.firebasestorage.app",
  messagingSenderId: "308378612560",
  appId: "1:308378612560:web:754602ff16081707e5f255"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
