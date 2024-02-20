import { FirebaseApp, FirebaseError, initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  Auth,
} from "firebase/auth";

// ======================== Set up ====================== //

// firebase configuration details
const firebaseConfig = {
  apiKey: "AIzaSyB8wikOrixKqbm2lSW-unHcOcMlNWVUsGw",
  authDomain: "uol-agile.firebaseapp.com",
  projectId: "uol-agile",
  storageBucket: "uol-agile.appspot.com",
  messagingSenderId: "302924623262",
  appId: "1:302924623262:web:ecf56277d5a7eeaa387a8f",
};

// initialize firestore app
const _app = initializeApp(firebaseConfig);

// initialize firestore db
const _db = getFirestore(_app);

// initialize firestore auth service
const _auth = getAuth(_app);

// ================== Admin Panel - Services table ================= //
/**
 * Get all services in a category in `services` firestore collection
 * @param {string} _category
 */

type Category = {
  service: string;
  price: string;
  id: string;
};
const _retrieveSpecificServiceCategory = async (_category: string) => {
  const data: Category[] = [];

  // filter data in the `services` collection by category
  const q = query(
    collection(_db, "services"),
    where("category", "==", _category)
  );
  const snapshots = await getDocs(q);
  snapshots.forEach((doc) => {
    const _service = doc.data().service;
    const _price = doc.data().price;
    const id = doc.id;
    data.push({ service: _service, price: "£" + _price, id: id });
  });
  return data;
};

/**
 * Search and remove service in the `services` collection
 * @param {string} _category
 * @param {string} indDocIdToDelete
 */
const _deleteSpecificService = async (
  _category: string,
  indDocIdToDelete: number
) => {
  // filter data in the `services` collection by category
  const q = query(
    collection(_db, "services"),
    where("category", "==", _category)
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
const _deleteService = async (docID: string) => {
  try {
    await getDoc(doc(_db, "services", docID));
  } catch (err) {
    throw err;
  }
};

// ================== Admin Panel - Orders table ================= //

type Order = {
  service_name: string;
  service_status: string;
  customer_name: string;
  customer_preferred_time: string;
};

/**
 * Retrieve all records in the `orders` firestore collection
 */
const _retrieveOrders = async () => {
  const data: Order[] = [];
  const snapshots = await getDocs(collection(_db, "orders"));
  snapshots.forEach((doc) => {
    const _serviceName = doc.data().serviceName;
    const _serviceStatus = doc.data().serviceStatus;
    const _customerName = doc.data().customerName;
    const _customerPreferredTime = doc.data().customerPreferredTime;

    data.push({
      service_name: _serviceName,
      service_status: _serviceStatus,
      customer_name: _customerName,
      customer_preferred_time: _customerPreferredTime,
    });
  });
  return data;
};

// ================== Admin Panel - Users table ================= //

/**
 * Retrieve all records in the `users` firestore collection
 */

type User = {
  created_at: string;
  id: string;
  last_signed_in: string;
  role: string;
};

const _retrieveUsers = async () => {
  const data: User[] = [];
  const snapshots = await getDocs(collection(_db, "users"));
  snapshots.forEach((doc) => {
    const _userCreatedAt = doc.data().created_at;
    const _userID = doc.data().id;
    const _userLastSignedIn = doc.data().last_signed_in;
    const _userRole = doc.data().role;

    data.push({
      created_at: _userCreatedAt,
      id: _userID,
      last_signed_in: _userLastSignedIn,
      role: _userRole,
    });
  });
  return data;
};

// ================== Regular User Sign Up ================= //
type UserSignUpCredential = {
  auth?: Auth;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type UserSignUpRecord = {
  firstName: string;
  lastName: string;
  created_at?: string;
  id: string;
  last_signed_in?: string;
  role: string;
};

const _insertIntoUsersCollection = async (userRecord: UserSignUpRecord) => {
  try {
    await setDoc(doc(_db, "users", userRecord.id), userRecord);
    return "success";
  } catch (err) {
    console.log(err);
  }
};

const _userSignUp = async (
  userCredential: UserSignUpCredential,
  userRole: string
) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      _auth,
      userCredential.email,
      userCredential.password
    );
    const lastName = userCredential.lastName;
    const firstName = userCredential.firstName;
    const created_at = createdUser.user.metadata.creationTime;
    const userId = createdUser.user.uid;
    const lastSignedIn = createdUser.user.metadata.lastSignInTime;
    const role = "user";
    const insertIntoUsersCollectionResult = await _insertIntoUsersCollection({
      firstName: firstName,
      lastName: lastName,
      created_at: created_at,
      id: userId,
      last_signed_in: lastSignedIn,
      role: role,
    });
    console.log(
      "insertIntoUsersCollectionResult",
      insertIntoUsersCollectionResult
    );
    if (createdUser && insertIntoUsersCollectionResult) {
      console.log(
        userCredential.email,
        "is created and inserted into collection successfully"
      );
      return { isCreated: true };
    }
  } catch (err) {
    console.log(err.code, err.message);
    return { isCreated: false, error: err.message };
  }
};
// ================== Regular User Sign In ================= //
type UserSignInCredential = {
  auth?: Auth;
  email: string;
  password: string;
};

type UpdateUserRecord = {
  userId: string;
  lastSignedInTime?: string;
};
const _updateUsersCollectionAfterSignIn = async (
  updateUserRecord: UpdateUserRecord
) => {
  try {
    await updateDoc(doc(_db, "users", updateUserRecord.userId), {
      last_signed_in: updateUserRecord.lastSignedInTime,
    });
    return "success";
  } catch (err) {
    console.log(err);
    return "false";
  }
};

const _userSignIn = async (userCredential: UserSignInCredential) => {
  try {
    const signedInUser = await signInWithEmailAndPassword(
      _auth,
      userCredential.email,
      userCredential.password
    );
    const userId = signedInUser.user.uid;
    const lastSignedInTime = signedInUser.user.metadata.lastSignInTime;
    const updateUsersCollectionResult = await _updateUsersCollectionAfterSignIn(
      {
        userId: userId,
        lastSignedInTime: lastSignedInTime,
      }
    );
    if (signedInUser && "success") {
      return { isSignedIn: true };
    }
  } catch (err) {
    console.log(err.code, err.message);
    return { isSignedIn: false, error: err.message };
  }
};

// ================== Become a Contractor Sign Up ================= //
type contractorSignUpCredential = {
  name: string;
  email: string;
  service: string;
};

const _insertIntoContractorPlatformRequestCollection = async (
  contractorCredential: contractorSignUpCredential
) => {
  try {
    await addDoc(collection(_db, "contractor_platform_requests"), {
      email: contractorCredential.email,
      full_name: contractorCredential.name,
      service: contractorCredential.service,
    });
    return "success";
  } catch (err) {
    console.log(err);
    return "fail";
  }
};

// ================== Booking Flow - Step 2 ================= //

/**
 * Retrieve all unique subcategories in the `booking` firestore collection
 * @param {string} _category
 */
type UniqueSubCategoryMap = {
  [subcategory: string]: number;
};
const _retrieveSpecificBookingSubcategories = async (_category: string) => {
  const subcategories: string[] = [];
  const uniqueSubCategoryMap: UniqueSubCategoryMap = {};

  // filter data in the `services` collection by category
  const q = query(
    collection(_db, "services"),
    where("category", "==", _category)
  );
  const snapshots = await getDocs(q);
  snapshots.forEach((doc) => {
    // create a subcategory map
    const subcategory: string = doc.data().subcategory;
    if (uniqueSubCategoryMap[subcategory]) {
      uniqueSubCategoryMap[subcategory] += 1;
    } else {
      uniqueSubCategoryMap[subcategory] = 0;
    }
  });

  Object.keys(uniqueSubCategoryMap).forEach((subcategory) => {
    subcategories.push(subcategory);
  });
  // console.log(data);
  return subcategories;
};

/**
 * Retrieve specific services in the `booking` firestore collection filter by subcategory
 * @param {string} _category
 * @param {string} _subcategory
 */

type Service = {
  service: string;
};
const _retrieveSpecificBookingServices = async (
  _category: string,
  _subcategory: string
) => {
  const services: Service[] = [];

  // filter data in the `services` collection by category
  const q = query(
    collection(_db, "services"),
    where("category", "==", _category),
    where("subcategory", "==", _subcategory)
  );
  const snapshots = await getDocs(q);
  snapshots.forEach((doc) => {
    // create a subcategory map
    const service = doc.data().service;
    services.push(service);
  });
  return services;
};

// ================== Booking Flow - Step 4 ================= //

/**
 * Retrieve specific services in the `booking` firestore collection filter by subcategory
 * @param {Object} _category
 */

type DataObject = {
  customerPreferredTime: string;
  serviceName: object;
  serviceStatus: string;
};
const _createServiceRecord = async (dataObject: DataObject) => {
  try {
    const docRef = await addDoc(collection(_db, "orders"), dataObject);
    console.log("Created successfully");
  } catch (e) {
    console.error(e);
  }
};

// FirebaseObject
export const firebaseObject = {
  // initialize app
  app: _app,

  // get db
  db: _db,

  // initialize auth
  auth: _auth,

  //retrieve services by category
  retrieveSpecificServiceCategory: _retrieveSpecificServiceCategory,

  // delete service
  deleteSpecificService: _deleteSpecificService,

  // retrieve orders
  retrieveOrders: _retrieveOrders,

  // retrieve users
  retrieveUsers: _retrieveUsers,

  // retrieve service subcategories
  retrieveSpecificBookingSubcategories: _retrieveSpecificBookingSubcategories,

  // retrieve services
  retrieveSpecificBookingServices: _retrieveSpecificBookingServices,

  // create service record
  createServiceRecord: _createServiceRecord,

  // user sign up
  userSignUp: _userSignUp,

  // user sign in
  userSignIn: _userSignIn,

  // submit contractor registration form
  insertIntoContractorPlatformRequestCollection:
    _insertIntoContractorPlatformRequestCollection,
};
