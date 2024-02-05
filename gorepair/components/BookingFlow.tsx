'use client'

import { useState } from 'react'
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
  WrapItem
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { Span } from 'next/dist/trace'
import Calendar from '@/components/Calendar'

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

const Form1 = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Choose a Service Category
      </Heading>
      <Flex justifyContent="space-between">
          <Card w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/75634/electric-current-symbol.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical</Text></CardHeader>
          </Card>
          <Card w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/283208/plumbering-plumber.svg" alt="Plumbing Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Plumbing</Text></CardHeader>
          </Card>
          <Card w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/28040/carpentry.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Woodwork</Text></CardHeader>
          </Card>
          <Card w="200px">
            <Center>
              <Image src="https://www.svgrepo.com/show/485927/tools.svg" alt="Electrical Icon" boxSize="100px"/>
            </Center>
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Handyman</Text></CardHeader>
          </Card>
      </Flex>
    </>
  )
}

const Form2 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Which Services Do You Need?
      </Heading>
      <Flex justifyContent="space-between">
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
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical 2</Text></CardHeader>
            <CardBody>
              <HStack>
                <Text as="span" mr="10px">Service 1</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test2")}> - </Button>
                <Text as="span" id="test2">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test2")}> + </Button>
              </HStack>
            </CardBody>
          </Card>
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical 3</Text></CardHeader>
            <CardBody>
              <HStack>
                <Text as="span" mr="10px">Service 1</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test3")}> - </Button>
                <Text as="span" id="test3">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test3")}> + </Button>
              </HStack>
            </CardBody>
          </Card>
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Electrical 4</Text></CardHeader>
            <CardBody>
              <HStack>
                <Text as="span" mr="10px">Service 1</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test4")}> - </Button>
                <Text as="span" id="test4">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test4")}> + </Button>
              </HStack>
            </CardBody>
          </Card>
      </Flex>
    </>
  )
}

const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Book Your Slot
      </Heading>
      <Flex justifyContent="space-between">
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Summary</Text></CardHeader>
            <CardBody>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 1</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test1")}> - </Button>
                <Text as="span" id="test1">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test1")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 2</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test3")}> - </Button>
                <Text as="span" id="test3">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test3")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 3</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test3")}> - </Button>
                <Text as="span" id="test3">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test3")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 4</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test4")}> - </Button>
                <Text as="span" id="test4">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test4")}> + </Button>
              </HStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb="0px"><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Date</Text></CardHeader>
            <CardBody>
            <Calendar></Calendar>
            </CardBody>
          </Card>
          <Card w="318px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Time</Text></CardHeader>
            <CardBody>
              <Wrap spacing={5} justify="center">
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t9' onClick={()=> selected('t9')}>09:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t10' onClick={()=> selected('t10')}>10:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t11' onClick={()=> selected('t11')}>11:00 AM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t12' onClick={()=> selected('t12')}>12:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t1' onClick={()=> selected('t1')}>01:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t2' onClick={()=> selected('t2')}>02:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t3' onClick={()=> selected('t3')}>03:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t4' onClick={()=> selected('t4')}>04:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t5' onClick={()=> selected('t5')}>05:00 PM</Button>
                </WrapItem>
                <WrapItem>
                  <Button w="100px" colorScheme='gray' id='t6' onClick={() => selected('t6')}>06:00 PM</Button>
                </WrapItem>
              </Wrap>
            </CardBody>
          </Card>
      </Flex>
    </>
  )
}

const Form4 = () => {
  return (
    <>
        <Heading w="100%" textAlign={'center'} fontWeight="bold" mt="2%" mb="5%">
        Book Your Slot
      </Heading>
      <Flex justifyContent="space-between">
          <Card w="200px">
            <CardHeader><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Summary</Text></CardHeader>
            <CardBody>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 1</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test1")}> - </Button>
                <Text as="span" id="test1">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test1")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 2</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test3")}> - </Button>
                <Text as="span" id="test3">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test3")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 3</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test3")}> - </Button>
                <Text as="span" id="test3">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test3")}> + </Button>
              </HStack>
              <HStack mb="10px">
                <Text as="span" mr="10px">Service 4</Text>
                <Button size='xs' onClick={()=> decreaseOrder("test4")}> - </Button>
                <Text as="span" id="test4">0</Text>
                <Button size='xs' onClick={()=> increaseOrder("test4")}> + </Button>
              </HStack>
            </CardBody>
          </Card>

          <Card>
            <CardHeader pb="0px"><Text fontSize={'2xl'} fontWeight={'bold'} textAlign={'center'}>Date & Time</Text></CardHeader>
            <CardBody>
              <Text fontSize={'xl'} textAlign={'center'}>05th February, 2024</Text> 
              <Text fontSize={'lg'} textAlign={'center'}>at</Text>
              <Text fontSize={'xl'} textAlign={'center'}>06:00 PM</Text>
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
        {activeStep === 0 ? <Form1 /> : activeStep === 1 ? <Form2 /> : activeStep === 2 ? <Form3 / > : <Form4 />}
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
                onClick={() => {
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