// 'use server'

import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import  {firebaseObject} from "../config/firebaseObject"



export const Forms = () =>
{
  const dbRef = collection(firebaseObject.db, "services")
  const [formData, setFormData] = useState([])

    //when the page refreshes - Retrieve all sevices data
    useEffect(() =>
    {
      //retrieve data
      getServicesData()

      //clear data
      return () =>
      {
        setFormData([])
      }
    }, [])
    
  const getServicesData = async () =>{
    try{        
      const snapshots = await getDocs(dbRef)
      const data = []
      snapshots.forEach((snapshot) =>{
        data.push({...snapshot.data(), id: snapshot.id})  
      })
      console.log(data)
      setFormData(data)
      console.log("formData", formData)
    }catch(err){
      console.error(err)
    }
  }

  const renderServices =
    formData.map((data,ind) =>
    (
        <div key={ind}>
          <p key={`name${ind}`}>Service Name: {data.name}</p>
          <p key={`price${ind}`}>Service Price: {data.price}</p>  
        </div>
      )

        )

  return(
    <div>
      <h1>Repairs</h1>
      <div>
        {renderServices}
      </div>
    </div>
  )
}