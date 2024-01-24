import {initializeApp} from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {firebaseConfig} from "../config/firebase"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const dbRef = collection(db, "repair_services")

export const Forms = ({service}) => //service = string
{

  const readCollection = async () =>
  {
    const d = [] //array of objects
    try{
      const docs = await getDocs(dbRef)
      docs.forEach((snapshot) => {
        d.push({...snapshot.data()})
      })  
      console.log("returning", d);
      return d
    }catch(err){
      console.error(err)
    }
  } 

  const retrivePriceByService = async (s) =>
  {
    try{
      const data = await readCollection() //contains array of objects
      //retrieve price of the service
      return data.find(ele => ele.name === s).price
    }catch(err){
      console.error(err)
    }

  }
  const price = retrivePriceByService(service)
  return(
    <div>
      <p>Service Name: {service}</p>
      <p>Price: {price}</p>
    </div>
  )
}