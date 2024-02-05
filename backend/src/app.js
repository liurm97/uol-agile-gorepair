// firebase app
import { initializeApp } from "firebase/app";

import {
  deleteRepairService,
  addRepairService,
  getRealtimeRepairServices,
  getRealtimeFilteredRepairServices,
  getSingleDocument,
} from "./repairServiceActions";

// firestore app
import { getFirestore, collection, doc, updateDoc } from "firebase/firestore";

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

const updateForm = document.querySelector(".update");
const updateFormValidation = document.querySelector(".updateFormValidationMsg");
updateForm.addEventListener("submit", (e) => {
  const docID = updateForm.id.value;
  const repairName = updateForm.updateRepairName.value;
  const repairPrice = updateForm.updateRepairPrice.value;

  e.preventDefault();
  if (
    //both repair name and repair price are empty
    repairName === "" &&
    repairPrice === ""
  ) {
    updateFormValidation.innerHTML =
      "At least one field is required. Try again.";
    updateFormValidation.style.color = "red";
    updateFormValidation.style.textAlign = "center";

    setTimeout(() => (updateFormValidation.innerHTML = ""), 3000);
    console.log("Try again");
  } else {
    const docRef = doc(repairServiceCollection, docID);
    //both repair name and repair price are empty
    if (repairName === "" && repairPrice !== "") {
      updateDoc(docRef, { price: Number(repairPrice) }).then(() =>
        updateForm.reset()
      );
    }

    if (repairName !== "" && repairPrice === "") {
      updateDoc(docRef, { name: repairName }).then(() => updateForm.reset());
    }
  }
});

getRealtimeRepairServices(repairServiceCollection);
// getRealtimeFilteredRepairServices(
//   repairServiceCollection,
//   "name",
//   "handy-work"
// );
// getSingleDocument(repairServiceCollection, "KFHsBkdainQXyOrMsJhz");
