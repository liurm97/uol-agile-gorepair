// 'use server'

import {initializeApp} from "firebase/app"
import { getFirestore, collection, getDocs, arrayRemove } from "firebase/firestore";
import {firebaseConfig} from "../config/firebase"
import { useState, useEffect } from "react";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const dbRef = collection(db, "repair_services")


export const Forms = () => //service = string
{
  const [formData, setFormData] = useState([])

  //when the page refreshes - Retrieve all sevices data
  useEffect(() =>
  {
    const getServicesData = async () =>{
      try{        
        const snapshots = await getDocs(dbRef)
        const data = []
        snapshots.forEach((snapshot) =>{
          data.push({...snapshot.data(), id: snapshot.id})  
        })
        console.log(data)
        setFormData(data)
      }catch(err){
        console.error(err)
      }
    }
    getServicesData()
  }, [])
  
  return(
    <div>
      <h1>Repairs</h1>
      <div>
        {formData.map((data,ind) => 
        <div key={ind}>
          <p key={`name${ind}`}>Service Name: {data.name}</p>
          <p key={`price${ind}`}>Service Price: {data.price}</p>  
        </div>
        )}
      </div>
    </div>
  )
}