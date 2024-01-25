'use client'

import {firebaseConfig} from "../../config/firebase"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

export default function signUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // initialize app
  const app = initializeApp(firebaseConfig)

  // get db
  const db = getFirestore(app)

  // initialize auth
  const auth = getAuth(app)

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={6}>
            <HStack>
              {/* <Box> */}
                {/* <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" onChange={e => console.log(e.target.value)}/>
                </FormControl> */}
              {/* </Box> */}
              {/* <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box> */}
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={e => {
                console.log("email: ", e.target.value);
                setEmail(e.target.value)
              }}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} onChange={e => {
                console.log("password: ", e.target.value);
                setPassword(e.target.value)
              }}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={()=> {
                  createUserWithEmailAndPassword(auth, email, password).then(user =>{
                    // retrieve information about newly created user
                    const currentUser = auth.currentUser
                    if (currentUser){
                      console.log("current user: ", currentUser)
                      const uuid = currentUser.uid //is also the document id
                      const _created_at = currentUser.metadata.creationTime
                      const _last_signed_in = currentUser.metadata.lastSignInTime
                      
                      //create document and insert into `users` collection
                      setDoc(doc(db,"users", uuid),
                      {
                        id: uuid,
                        role: "user",
                        created_at: _created_at,
                        last_signed_in: _last_signed_in
                      })
                    }
                    // insert record into users `users` firestore collection
                    console.log("User has been created and inserted successfully\nUser: ", user)
                  }).catch(err => console.error("Something went wrong", err))
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}