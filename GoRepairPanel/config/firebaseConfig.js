import { initializeApp } from "firebase/app";
import { getFirestore, collection, where, getDocs, query, onSnapshot, deleteDoc, doc} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB8wikOrixKqbm2lSW-unHcOcMlNWVUsGw",
    authDomain: "uol-agile.firebaseapp.com",
    projectId: "uol-agile",
    storageBucket: "uol-agile.appspot.com",
    messagingSenderId: "302924623262",
    appId: "1:302924623262:web:ecf56277d5a7eeaa387a8f",
  };

  const _app = initializeApp(firebaseConfig);
  const _db = getFirestore(_app);
  const _auth = getAuth(_app);

  const _retrieveSpecificCategory = async (_category) =>
  {
    const data = [];
    const q = query(collection(_db, "services_v2"), where ("category", "==", _category));
    const snapshots = await getDocs(q)
    snapshots.forEach((doc) => {
        const _service = doc.data().name
        const _price = doc.data().price
        const id = doc.id
        data.push({"name": _service, "price": _price, "id": id})
    })
    // console.log(data)
    return data
  }

  const _deleteSpecificService = async (_category, indDocIdToDelete) =>
  {
        console.log("_retrieveIndexSpecificServiceToDelete")
        // get document id
        const q = query(collection(_db, "services_v2"), where ("category", "==", _category));
        let counter = 0;
        // const snapshots = await getDocs(q)
        // console.log("_retrieveIndexSpecificServiceToDelete - snapshots obtained")
        // snapshots.forEach((doc, indSnapshot) =>
        // {
        //     console.log("forEach loop")
        //     console.log("doc: ", doc, "indSnapshot", indSnapshot)
        //     if (indSnapshot === indDocIdToDelete){
        //         console.log(doc.id)
        //         return doc.id
        //     }
        // })
        getDocs(q).then((snapshots) =>{
            snapshots.forEach((data) =>{
                if (counter == indDocIdToDelete){
                    console.log("data.id", data.id )
                    _deleteAndReload(data.id)
                    // deleteDoc(doc(_db, "services_v2", data.id))
                    // // window.location.reload()
                }
                console.log("data", data, "index", counter, "indDocIdToDelete", indDocIdToDelete)
                console.log(counter == indDocIdToDelete)
                counter += 1
            })
        })
  }

//   const _deleteSpecificService = async (_category, indDocIdToDelete) =>
//   {
//         console.log("_deleteSpecificService")
//         // get document id
//         const docIdToDelete = await _retrieveIndexSpecificServiceToDelete(_category, indDocIdToDelete)
//         console.log("docIdToDelete", docIdToDelete)
//         // await deleteDoc(_db, docIdToDelete)
        
//   }

const _deleteAndReload = async (docID) =>
{
    await deleteDoc(doc(_db, "services_v2", docID))
    // window.location.reload()
}

  const _retrieveSpecificCategoryRealtime = (_category) =>
  {
    const d = [];
    const q = query(collection(_db, "services_v2"), where ("category", "==", _category));
    onSnapshot(q, (q_snapshot) =>
    {
        // console.log("q_snapshot.docs", q_snapshot.docs)
        q_snapshot.docs.forEach((doc) =>
        {
            // console.log(doc.data())
            const _service = doc.data().name
            const _price = doc.data().price
            console.log("service", _service)
            console.log("price", _price)
            d.push({"name": _service, "price": _price})
        })
    })
    return d
  }


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

    retrieveSpecificCategoryRealtime: _retrieveSpecificCategoryRealtime,

    // delete service
    deleteSpecificService: _deleteSpecificService
  };