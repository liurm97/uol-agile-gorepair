import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase";

const _app = initializeApp(firebaseConfig);
const _db = getFirestore(_app);
const _auth = getAuth(_app);

export const firebaseObject = {
  /*
   @app: firebase app
   @db: firestore database
   @auth: firebase auth service 
   */
  // initialize app
  app: _app,

  // get db
  db: _db,

  // initialize auth
  auth: _auth,
};
