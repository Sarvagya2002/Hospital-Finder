

  import { initializeApp } from "firebase/app";
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
  
  const firebaseConfig = {
    apiKey: "AIzaSyAGmiB-eOp6sOga34PVVtO6pSoMZvRXDJQ",
    authDomain: "my-awesome-project-61fc3.firebaseapp.com",
    projectId: "my-awesome-project-61fc3",
    storageBucket: "my-awesome-project-61fc3.firebasestorage.app",
    messagingSenderId: "496969601102",
    appId: "1:496969601102:web:faf97d4f210fa4005cb31f"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  export { auth, provider, signInWithPopup, signOut };
  