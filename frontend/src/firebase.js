import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyC-gk2z1ZgTP6kfyP-UXlj0iyUZLrKhP3U",
    authDomain: "metu-dtx-form-bd1c8.firebaseapp.com",
    projectId: "metu-dtx-form-bd1c8",
    storageBucket: "metu-dtx-form-bd1c8.appspot.com",
    messagingSenderId: "672774779672",
    appId: "1:672774779672:web:093c04c0ed58c06264246d",
    measurementId: "G-JVK86FCLTJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };