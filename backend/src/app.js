// firebase app
import { initializeApp } from "firebase/app";

import {
  deleteRepairService,
  addRepairService,
  getRealtimeRepairServices,
} from "./repairServiceActions";

// firestore app
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8wikOrixKqbm2lSW-unHcOcMlNWVUsGw",
  authDomain: "uol-agile.firebaseapp.com",
  projectId: "uol-agile",
  storageBucket: "uol-agile.appspot.com",
  messagingSenderId: "302924623262",
  appId: "1:302924623262:web:ecf56277d5a7eeaa387a8f",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// initialize firebase database
const db = getFirestore(app);

// initialize collection
const repairServiceCollection = collection(db, "repair_services");

const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = addForm.repair_name.value;
  const price = addForm.repair_price.value;
  const addRepairServiceStatus = addRepairService(
    repairServiceCollection,
    name,
    price
  );
  addRepairServiceStatus
    ? alert("Add Repair Service Successfully!")
    : alert("Add Repair Service Unsuccessful");
  addForm.reset();
});

const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const doc_id = deleteForm.id.value;
  console.log(doc_id);
  const deleteRepairServiceStatus = deleteRepairService(
    db,
    "repair_services",
    doc_id
  );
  deleteRepairServiceStatus
    ? alert("Delete Repair Service Successfully!")
    : alert("Delete Repair Service Unsuccessful");
  deleteForm.reset();
});

getRealtimeRepairServices(repairServiceCollection);
