import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDOqf06znM6Kfk41yvt2Xz4tvj4RjpUcpA",
  authDomain: "tlcn-8af87.firebaseapp.com",
  projectId: "tlcn-8af87",
  storageBucket: "tlcn-8af87.appspot.com",
  messagingSenderId: "341056896439",
  appId: "1:341056896439:web:552e6fb4f488b533b13c32",
  measurementId: "G-Y25E44LWK5"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);