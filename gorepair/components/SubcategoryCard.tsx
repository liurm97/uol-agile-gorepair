import { Card, CardHeader, Text, HStack, CardBody, Button, GridItem } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import {firebaseObject} from "../app/config/firebaseConfig"
import { ServiceCard } from "./ServiceCard";

export const SubcategoryCard = ({category, selectedServices, setSelectedServices}) =>
{
  const [subcategory, setSubcategory] = useState([])

  useEffect(() =>
  {
      firebaseObject.retrieveSpecificBookingSubcategories(category).then(result =>{
        setSubcategory([...result])
      })
  }, [])
  return (
    <>
      {subcategory.map((item) =>
    <GridItem w='100%' h='auto' key={crypto.randomUUID()}>
    <Card w="200px">
      <CardHeader>
      <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>{item}</Text>
      </CardHeader>
      <CardBody>
        <ServiceCard key={crypto.randomUUID()} category={category} subcategory={item} selectedServices={selectedServices} setSelectedServices={setSelectedServices}/>
      </CardBody>
    </Card>
    </GridItem>
)}

    {/* <GridItem w='100%' h='auto'>
    <Card w="200px">
    <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical 1</Text></CardHeader>
    <CardBody>
      <HStack>
        <Text as="span" mr="10px">Service 1</Text>
        <Button size='xs' onClick={()=> decreaseOrder("test1")}> - </Button>
        <Text as="span" id="test1">0</Text>
        <Button size='xs' onClick={()=> increaseOrder("test1")}> + </Button>
      </HStack>
    </CardBody>
    </Card>
    </GridItem> */}

    
    </>
  )
}

// {firebaseObject.retrieveSpecificBookingSubcategories(category).then(result =>
//   {
//     // console.log("category", category)
//     // console.log("result", result)
//     result.map((item, ind) =>{
//       {console.log("item", item)}
//       <GridItem w='100%' h='auto' key={ind}>
//       <Card w="200px">
//       <CardHeader>
//         {/* <Text key={ind} fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>{item}</Text> */}
//         <Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>{item}</Text>
//         </CardHeader>
//       <CardBody>
//         <HStack>
//           <Text as="span" mr="10px">Service 1</Text>
//           <Button size='xs' onClick={()=> decreaseOrder("test1")}> - </Button>
//           <Text as="span" id="test1">0</Text>
//           <Button size='xs' onClick={()=> increaseOrder("test1")}> + </Button>
//         </HStack>
//       </CardBody>
//       </Card>
//       </GridItem>
//   })
//   })
// }