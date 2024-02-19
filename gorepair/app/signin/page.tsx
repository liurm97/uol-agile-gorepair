'use client'

import {firebaseConfig} from "../../config/firebase"

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";



export default function SignInPage() {

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
<<<<<<< HEAD
      minH={'100vh'}
      align={'flex-start'}
      justify={'center'}
=======
      minH="100vh"
      align="center"
      justify="center"
>>>>>>> 126c133 (Frontend Updates)
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool <Link color="blue.400" href="#">features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align="start"
                justify="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link color="blue.400" href="/forgot-password">Forgot password?</Link>
              </Stack>
              <Button
<<<<<<< HEAD
                bg={'blue.400'}
                // as={'a'}
                // href={'/'}
                color={'white'}
=======
                bg="blue.400"
                color="white"
>>>>>>> 126c133 (Frontend Updates)
                _hover={{
                  bg: 'blue.500',
                }}
                 onClick={() =>{
                  console.log("Signing in")
                  signInWithEmailAndPassword(auth, email, password).then(user =>{
      
                    // Successful sign in - Redirect to home page
                    window.location.href = "/";

                    const signedInUser = user.user
                    console.log("Signed-in User: ", signedInUser)
                    const uuid = signedInUser.uid
                    // update users database
                    // update sign in time
                    const updateRef = doc(db, "users", uuid)
                    updateDoc(updateRef, {
                      last_signed_in: signedInUser.metadata.lastSignInTime
                    }).then(() => {console.log("Last signed in time updated for user - ", uuid)})
                    .catch(err => {console.error(err)})
                  })

                }}
                >
                Sign in
              </Button>
              <Text align="center">
                New to the site? <Link color="blue.400" href="/signup">Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}