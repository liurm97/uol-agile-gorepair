import {
  addDoc,
  onSnapshot, //get data from firestore in realtime
  deleteDoc,
  doc, //reference to the document we want to delete
} from "firebase/firestore";

export const deleteRepairService = async (_database, _collection, _docID) => {
  /*
    @_database: value of firestore database
    @_collection: value of collection
    @_docID: value of document id to delete
  */

  try {
    // get reference of the document to delete
    const docref = doc(_database, _collection, _docID);

    // delete the document
    await deleteDoc(docref);

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
