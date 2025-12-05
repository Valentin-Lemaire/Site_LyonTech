// Import Firebase SDKs from CDN for browser usage without bundler
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Layout configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRnfU9g641yhKsjGXxbV_KbzRN3whfa1M",
    authDomain: "site-lyon-tech.firebaseapp.com",
    projectId: "site-lyon-tech",
    storageBucket: "site-lyon-tech.firebasestorage.app",
    messagingSenderId: "382756341988",
    appId: "1:382756341988:web:189cf01cb7819764a1c4f1",
    measurementId: "G-HHNHXMTZ75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage, collection, addDoc, getDocs, doc, deleteDoc, updateDoc, onAuthStateChanged, signInWithEmailAndPassword, signOut };
