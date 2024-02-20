"use client";

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
} from "@chakra-ui/react";
import { useState } from "react";
import { firebaseObject } from "../config/firebaseConfig";

export default function SignInPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Sign in to your account</Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool{" "}
            <Link color="blue.400" href="#">
              features
            </Link>{" "}
            ✌️
          </Text>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  console.log("password", password);
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Link color="blue.400" href="/forgot-password">
                  Forgot password?
                </Link>
              </Stack>
              {loading ? (
                <Button bg="blue.100" color="white">
                  Sign in
                </Button>
              ) : (
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={() => {
                    setLoading(true);
                    firebaseObject
                      .userSignIn({
                        email: email,
                        password: password,
                      })
                      .then((res) => {
                        if (res?.isSignedIn == true) {
                          window.location.href = "/booking";
                        } else if (res?.isSignedIn == false) {
                          setError(res?.error);
                          setLoading(false);
                        }
                      });
                  }}
                >
                  Sign in
                </Button>
              )}
              {error ? (
                <Text color="tomato">{error?.split(":")[1]}</Text>
              ) : undefined}
              <Text align="center">
                New to the site?{" "}
                <Link color="blue.400" href="/signup">
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
