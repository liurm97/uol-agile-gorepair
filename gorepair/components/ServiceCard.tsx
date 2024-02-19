import { Card, CardHeader, Text, HStack, CardBody, Button, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import {firebaseObject} from "../app/config/firebaseConfig"

export const ServiceCard = ({category, subcategory}) =>
{
  console.log("category", category, "subcategory", subcategory)
  const [services, setServices] = useState([])
  useEffect(() =>
  {
    console.log("render");
    firebaseObject.retrieveSpecificBookingServices(category, subcategory).then(result =>{
      console.log("result", result)
      setServices([...result])
    })
  }, [])
  function decreaseOrder(id) {
    var orderLine = document.getElementById(id);
    if (orderLine){
      let value = orderLine.innerHTML
        if (value != "0")
          orderLine.innerHTML = (Number(value) - 1).toString();
    }
  }

  function increaseOrder(id) {
    var orderLine = document.getElementById(id);
    if (orderLine){
      let value = orderLine.innerHTML
          orderLine.innerHTML = (Number(value) + 1).toString();
    }
  }
  return(
    <>
          {services.map((item) =>{
          const uuid = crypto.randomUUID()
        return <HStack key={uuid}>
        <Text as="span" mr="10px">{item}</Text>
        <Button key={uuid+1} size='xs' onClick={()=> decreaseOrder(uuid)}> - </Button>
        <Text key={uuid+2} as="span" id={uuid}>0</Text>
        <Button key={uuid+3} size='xs' onClick={()=> increaseOrder(uuid)}> + </Button>
      </HStack>}
)}

    </>
  )
}