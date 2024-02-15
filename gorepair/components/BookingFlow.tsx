'use client'

import { useState, useRef } from 'react'
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Text,
  Textarea,
  FormHelperText,
  InputRightElement,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Center,
  HStack,
  Wrap,
  WrapItem,
  Grid
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { Span } from 'next/dist/trace'
import Calendar from '@/components/Calendar'
import { color } from 'framer-motion'
import { SubcategoryCard } from './SubcategoryCard'
import { firebaseObject } from '@/app/config/firebaseConfig'

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
function selected(id) {
  var time = document.getElementById(id);
  var check = document.getElementsByClassName('selected')
  if (check.length != 0){
    check[0].removeAttribute('class');
    check[0].style.background =  'gray';
  }
  if (time){
    time.className = 'selected';
    time.style.background =  '#555555';

  }
}

const Form1 = (props) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Choose a Service Category
      </Heading>
      <Flex justifyContent="space-between">
          <Card onClick={() =>{ props.serviceSelect("Electrical"); props.stepChanger(1)}} w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/75634/electric-current-symbol.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical</Text></CardHeader>
          </Card>
          <Card onClick={() =>{ props.serviceSelect("Plumbing"); props.stepChanger(1)}} w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/283208/plumbering-plumber.svg" alt="Plumbing Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Plumbing</Text></CardHeader>
          </Card>
          <Card onClick={() =>{ props.serviceSelect("Woodwork"); props.stepChanger(1)}} w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/28040/carpentry.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Woodwork</Text></CardHeader>
          </Card>
          <Card onClick={() =>{ props.serviceSelect("Handy-man/woman/person"); props.stepChanger(1)}} w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/485927/tools.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Handyman</Text></CardHeader>
          </Card>
      </Flex>
    </>
  )
}

const Form2 = (props) => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Which Services Do You Need?
      </Heading>
      <Heading mb={5}>{props.serviceCat}</Heading>
      <Grid templateColumns="repeat(4,1fr)" gap={6}>
        <SubcategoryCard category={props.serviceCat} selectedServices={props.selectedServices} setSelectedServices={props.setSelectedServices}/>
      </Grid>
    </>
  )
}

const Form3 = (props) => { //selectedServices, selectedTime, props.setSelectedTime, selectedDate, setSelectedDate, onChangeValue
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Book Your Slot
      </Heading>
      <Flex justifyContent="space-between">
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Summary</Text></CardHeader>
            <CardBody>
              <Text fontWeight={'bold'}>Service, Qty</Text>
            </CardBody>
            <CardBody>
            {
            Object.keys(props.selectedServices).map((oneKey,i)=>{
            return (
                <Text>{oneKey}, {props.selectedServices[oneKey]}</Text>
              )
            })
            }
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb="0px"><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Date</Text></CardHeader>
            <CardBody>
            <Calendar value={props.selectedDate} onChangeValue={props.onChangeValue}/>
            </CardBody>
          </Card>
          <Card w="318px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Time</Text></CardHeader>
            <CardBody>
              <Wrap spacing={5} justify="center">
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t9' onClick={()=> props.setSelectedTime('09:00 AM')}>09:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t10' onClick={()=> props.setSelectedTime('10:00 AM')}>10:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t11' onClick={()=> props.setSelectedTime('11:00 AM')}>11:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t12' onClick={()=> props.setSelectedTime('12:00 PM')}>12:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t1' onClick={()=> props.setSelectedTime('01:00 PM')}>01:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t2' onClick={()=> props.setSelectedTime('02:00 PM')}>02:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t3' onClick={()=> props.setSelectedTime('03:00 PM')}>03:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t4' onClick={()=> props.setSelectedTime('04:00 PM')}>04:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t5' onClick={()=> props.setSelectedTime('05:00 PM')}>05:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t6' onClick={() => props.setSelectedTime('06:00 PM')}>06:00 PM</Button>
                </WrapItem>
              </Wrap>
            </CardBody>
          </Card>
          <Card w="318px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Selected Date & Time</Text></CardHeader>
            <CardBody>
              {props.selectedDate.toDateString()} at {props.selectedTime}
            </CardBody>
          </Card>
      </Flex>
    </>
  )
}

const Form4 = (props) => {
  return (
    <>
        <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Book Your Slot
      </Heading>
      <Flex justifyContent="space-between">
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Summary</Text></CardHeader>
            <CardBody>
              <Text fontWeight={'bold'}>Service, Qty</Text>
            </CardBody>
            <CardBody>
            {
            Object.keys(props.selectedServices).map((oneKey,i)=>{
            return (
                <Text>{oneKey}, {props.selectedServices[oneKey]}</Text>
              )
            })
            }
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb="0px"><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Date & Time</Text></CardHeader>
            <CardBody>
              <Text fontSize={'xl'} textAlign={'center'}>{props.selectedDate.toDateString()}</Text> 
              <Text fontSize={'lg'} textAlign={'center'}>at</Text>
              <Text fontSize={'xl'} textAlign={'center'}>{props.selectedTime}</Text>
            </CardBody>
          </Card>
          <Card w="318px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Address</Text></CardHeader>
            <CardBody>
              <Text fontSize={'lg'} textAlign={'center'}>Arriving At:</Text>
              <Text fontSize={'xl'} textAlign={'center'}>1, Canary Wharf, Not a Place</Text>
            </CardBody>
          </Card>
      </Flex>
    </>
  )
}

export default function Multistep() {
  const toast = useToast()
  const steps = [
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
    { title: '', description: '' },
  ]
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const [serviceCat, setServiceCat] = useState('');
  const [selectedServices, setSelectedServices] = useState({})
  const updateSelectedServices = (selectedServicesCopy, name, qty) => {
    selectedServicesCopy[name] = qty
    if (qty == 0)
      delete selectedServicesCopy[name]
    console.log(selectedServices)
  }
  const [selectedTime, setSelectedTime] = useState(''); //selected time
  const [selectedDate, setSelectedDate] = useState(new Date()); //calendar value
  const onChangeValue = (newValue) => setSelectedDate(newValue); //callback function for calendar (child)

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1000}
        p={6}
        m="10px auto"
        as="form">
        <Stepper index={activeStep}>
        {steps.map((step, index) => (
        <Step key={index} onClick={() => setActiveStep(index)}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
        {activeStep === 0 ? <Form1 stepChanger = {setActiveStep} serviceSelect = {setServiceCat}/> : activeStep === 1 ? <Form2 serviceCat = {serviceCat} selectedServices={selectedServices} setSelectedServices={updateSelectedServices}/> : activeStep === 2 ? <Form3 selectedServices={selectedServices} selectedTime={selectedTime} setSelectedTime={setSelectedTime} selectedDate={selectedDate} setSelectedDate={setSelectedDate} onChangeValue={onChangeValue}/ > : <Form4 selectedServices={selectedServices} selectedTime={selectedTime} selectedDate={selectedDate}/>}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                w="7rem"
                isDisabled={activeStep === 3}
                onClick={() => {
                  setActiveStep(activeStep + 1)
                }}
                colorScheme="teal"
                variant="outline">
                Next
              </Button>
            </Flex>
            {activeStep === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={async () => {
                  var requestData = {
                    customerPreferredTime: selectedDate+' at '+selectedTime,
                    servicesRequested: selectedServices,
                    serviceStatus: 'Pending'
                  }
                  firebaseObject.createServiceRecord(requestData);
                  toast({
                    title: 'Request Submitted.',
                    description: "We've submitted your request. You will be connected with a technician shortly.",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}