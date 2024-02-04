// This is a helper component to populate services table in Firebase

import {initializeApp} from "firebase/app"
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import {firebaseConfig} from "../config/firebase"
import { useState } from "react";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const dbRef = collection(db, "services")

export const CreateServiceForm = () =>
{

  const [category, setCategory] = useState("")
  const [subcategory, setSubCategory] = useState("")
  const [service, setService] = useState("")
  const [price, setPrice] = useState("")

  const create = async () =>
  {
    console.log("Start to create")

    // console.log("currentCategory", category)
    // console.log("currentSubcategory", subcategory)
    const services = service.split("\n")
    const prices = price.split("\n")
    console.log(services, prices)
    if (services.length !== prices.length){
      console.log ("Cannot create - Check service or price")
      return
    }
    for (let i = 0; i < services.length; ++i){
      const data = {
        category: category,
        subcategory: subcategory,
        service: services[i],
        price: Number(prices[i])
      }
      console.log("data:", data)
      const ref = await addDoc(dbRef, data)
      if (ref){
        console.log("Document written successfully with ID: ", ref.id)
      }
    }
    console.log("Complete")

  }  

  return(
    <div>
      <h1>CreateUserComponent</h1>
      <div>
      <label htmlFor="category" style={{verticalAlign: "middle"}}>Category</label>
      <textarea name="category" id="category" cols="30" rows="10" placeholder="category" style={{border: "1px solid #000"}} onChange={e => {
        setCategory(e.target.value)
        console.log(e.target.value)
      }}></textarea>
      </div>

      <div>
      <label htmlFor="subcategory" style={{verticalAlign: "middle"}}>SubCategory</label>
      <textarea name="subcategory" id="subcategory" cols="30" rows="10" style={{border: "1px solid #000"}} placeholder="subcategory" onChange={e => {
        setSubCategory(e.target.value)
        console.log(e.target.value)
      }}></textarea>
      </div>

      <div>
      <label htmlFor="service" style={{verticalAlign: "middle"}}>Service</label>
      <textarea name="service" id="service" cols="30" rows="10" style={{border: "1px solid #000"}} placeholder="service" onChange={e => {
        setService(e.target.value)
        console.log(e.target.value)
      }}></textarea>
      </div>

      <div>
      <label htmlFor="price" style={{verticalAlign: "middle"}}>Price</label>
      <textarea name="price" id="price" cols="30" rows="10" style={{border: "1px solid #000"}} placeholder="price" onChange={e => {
        setPrice(e.target.value)
        console.log(e.target.value)
      }}></textarea>
      </div>

      <button type="submit" onClick={create}>Create</button>
    </div>
  )
} 
