import { Card, CardHeader, Text, HStack, CardBody, Button, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import {firebaseObject} from "../app/config/firebaseConfig"

export const ServiceCard = ({category, subcategory, selectedServices, setSelectedServices}) =>
{
  const [services, setServices] = useState([])
  useEffect(() =>
  {
    firebaseObject.retrieveSpecificBookingServices(category, subcategory).then(result =>{
      setServices([...result])
    })
  }, [])
  function decreaseOrder(id, name) {
    var orderLine = document.getElementById(id);
    if (orderLine){
      let value = orderLine.innerHTML
        if (value != "0"){
          orderLine.innerHTML = (Number(value) - 1).toString();
        }
    }
  }

  function increaseOrder(id, name) {
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
        <Text id={item} as="span" mr="10px">{item}</Text>
        <Button key={uuid+1} size='xs' onClick={()=> {decreaseOrder(uuid, item); setSelectedServices(selectedServices, item, Number(document.getElementById(uuid)?.innerHTML))}}> - </Button>
        <Text key={uuid+2} as="span" id={uuid}>0</Text>
        <Button key={uuid+3} size='xs' onClick={()=> {increaseOrder(uuid, item); setSelectedServices(selectedServices, item, Number(document.getElementById(uuid)?.innerHTML))}}> + </Button>
      </HStack>}
)}

    </>
  )
}