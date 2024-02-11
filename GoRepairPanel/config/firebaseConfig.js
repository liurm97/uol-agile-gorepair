import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// firebase configuration details
const firebaseConfig = {
  apiKey: 'AIzaSyB8wikOrixKqbm2lSW-unHcOcMlNWVUsGw',
  authDomain: 'uol-agile.firebaseapp.com',
  projectId: 'uol-agile',
  storageBucket: 'uol-agile.appspot.com',
  messagingSenderId: '302924623262',
  appId: '1:302924623262:web:ecf56277d5a7eeaa387a8f',
};

// initialize firestore app
const _app = initializeApp(firebaseConfig);

// initialize firestore db
const _db = getFirestore(_app);

// initialize firestore auth service
const _auth = getAuth(_app);

/**
 * Get all services in a category in `services` firestore collection
 * @param {string} _category
 * @returns {[object]}
 */
const _retrieveSpecificCategory = async (_category) => {
  const data = [];

  // filter data in the `services` collection by category
  const q = query(
    collection(_db, 'services'),
    where('category', '==', _category),
  );
  const snapshots = await getDocs(q);
  snapshots.forEach((doc) => {
    const _service = doc.data().service;
    const _price = doc.data().price;
    const id = doc.id;
    data.push({ service: _service, price: '£' + _price, id: id });
  });
  return data;
};

/**
 * Search and remove service in the `services` collection
 * @param {string} _category
 * @param {string} indDocIdToDelete
 */
const _deleteSpecificService = async (_category, indDocIdToDelete) => {
  // filter data in the `services` collection by category
  const q = query(
    collection(_db, 'services'),
    where('category', '==', _category),
  );

  // initialize counter
  let counter = 0;

  // go through the collection and filter document reference id and delete it from the collection
  getDocs(q).then((snapshots) => {
    snapshots.forEach((data) => {
      if (counter == indDocIdToDelete) {
        try {
          _deleteService(data.id);
        } catch (err) {
          console.error(err);
        }
      }
      counter += 1;
    });
  });
};

/**
 * Remove specific service in the `services` firestore collection
 * @param {string} docID
 */
const _deleteService = async (docID) => {
  try {
    await deleteDoc(doc(_db, 'services', docID));
  } catch (err) {
    throw err;
  }
};

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

  //retrieve services by category
  retrieveSpecificCategory: _retrieveSpecificCategory,

  // delete service
  deleteSpecificService: _deleteSpecificService,
};
