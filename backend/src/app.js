// firebase app
import { initializeApp } from "firebase/app";

// firestore app
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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

const getRepairServices = async (database, collectionName) => {
  try {
    // get firestore collection
    const repairServiceCollection = collection(database, collectionName);

    // get documents from collection
    const repairServicesSnapshot = await getDocs(repairServiceCollection);
    const repairServicesList = [];

    // add document data, document id to list of dictionary
    repairServicesSnapshot.forEach((snapshot) => {
      repairServicesList.push({
        ...snapshot.data(),
        id: snapshot.id,
      });
    });
    return repairServicesList;
  } catch (error) {
    console.error(error);
  }
  //   const repairServicesList = repairServicesSnapshot.docs.map(
  //     (doc) => (d["data"] = doc.data())
  //   );
};

const repairServices = await getRepairServices(db, "repair_services");
repairServices.map((s) => console.log(s));
