import {initializeApp} from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {firebaseConfig} from "../config/firebase"
import {useState} from "react"

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const dbRef = collection(db, "repair_services")
const readCollection = async () =>
{
  const d = []
  try{
    const docs = await getDocs(dbRef)
    docs.forEach((snapshot) => {
      // console.log(snapshot.data())
      d.push({...snapshot.data()})
    })  
    // console.log({price: d[0]["price"], name: d[0]["name"]})
    // return {price: d[0]["price"], name: d[0]["name"]}
    // return d[0]["name"]
    // console.log(d[0]["name"]);
    // return d[0]["name"]
    console.log(d);
    return d
  }catch(err){
    console.error(err)
  }
} 

readCollection()
// const priceData = await readCollection()

// console.log(priceData)
export const Forms = ({service}) =>
{
  const [price, setPrice] = useState("")  
  const [name, setName] = useState("")  
  console.log(service) // sky-work
  const retrivePriceByService = async (service) =>
  {
    const data = await readCollection()

    return data.filter((ele, ind) => ele["name"] == service)[0]
  }
  retrivePriceByService(service).then((r) =>
  {
    setPrice(r["price"])  
    setName(r["name"])  
  })
  // const [price, setPrice] = useState(retrivePriceByService(service))
  // console.log("price:", price);
  // const [name, setName] = useState(readCollection()["name"])
  return(
    <div>
      <p>Service Name: {name}</p>
      <p>Price: {price}</p>
      {/* <label htmlFor="email">Email: </label>
      <input id="email" type="text" placeholder="...."/>
      <input type="submit" value="Submit" /> */}
      {/* <p>Price: {price}</p> */}
      {/* <p>Service Name: {name}</p> */}
    </div>
  )
}