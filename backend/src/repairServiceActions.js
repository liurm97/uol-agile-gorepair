import {
  addDoc,
  onSnapshot, //get data from firestore in realtime
  deleteDoc,
  doc, //reference to the document we want to delete
  query,
  where, //used in combination to get filtered data from firestore
  getDoc,
} from "firebase/firestore";

export const deleteRepairService = async (_database, _collection, _docID) => {
  /*
    @_database: value of firestore database
    @_collection: value of collection
    @_docID: value of document id to delete
  */

  try {
    // get reference of the document to delete
    const docRef = doc(_database, _collection, _docID);

    // delete the document
    await deleteDoc(docRef);

    // if deletion is successfully
    return true;
  } catch (e) {
    console.error(`addRepairService: Something went wrong\n${e}`);
    return false;
  }
};

export const addRepairService = async (_collection, _name, _price) => {
  /*
    @_collection: value of collection
    @_name: repair service name 
    @_price: repair service price
  */
  try {
    await addDoc(_collection, {
      name: _name,
      price: Number(_price),
    });
    return true;
  } catch (e) {
    console.error(`addRepairService: Something went wrong\n${e}`);
    return false;
  }
};

export const getRealtimeRepairServices = (_collection) => {
  /*
    @_collection: value of collection
  */

  // get documents from collection in real-time and store in snapshots
  onSnapshot(_collection, (snapshot) => {
    try {
      const repairServicesList = [];
      // add document data, document id to list of dictionary
      snapshot.docs.forEach((doc) => {
        repairServicesList.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      console.log(repairServicesList);
    } catch (error) {
      console.error(error);
    }
  });
};

export const getRealtimeFilteredRepairServices = (
  _collection,
  _docKey,
  _docValue
) => {
  /*
    @_collection: value of collection
    @_docKey: value of the property key we are filtering 
    @_docValue: value we are filtering
  */

  const filterCollection = query(_collection, where(_docKey, "==", _docValue));

  // get documents from collection in real-time and store in snapshots
  onSnapshot(filterCollection, (snapshot) => {
    try {
      const repairServicesList = [];
      // add document data, document id to list of dictionary
      snapshot.docs.forEach((doc) => {
        repairServicesList.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      console.log(repairServicesList);
    } catch (error) {
      console.error(error);
    }
  });
};

export const getSingleDocument = async (_collection, _docID) => {
  /*
    @_collection: value of collection
    @_docID: value of document id to delete
  */
  try {
    // get reference of the document to delete
    const docRef = doc(_collection, _docID);
    const docu = await getDoc(docRef);
    const docuData = { ...docu.data(), id: docu.id };
    console.log(docuData);
  } catch (e) {
    console.error(`getSingleDocument: Something went wrong\n${e}`);
    return false;
  }
};

// Update document is in `app.js`