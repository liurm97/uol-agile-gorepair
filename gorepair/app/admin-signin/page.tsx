"use client";

import { firebaseObject } from "@/config/firebaseConfig";
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
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState<undefined | boolean | string>(
    ""
  );
  const [isLoading, setIsLoading] = useState<undefined | boolean>(undefined);
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Admin Sign in</Heading>
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
                autoComplete="off"
                autoSave="off"
                type="email"
                onChange={(e) => {
                  console.log("email", e.target.value);
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  console.log("password", e.target.value);
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
              {isSignedIn === false && isLoading === false ? (
                <Text color={"red.600"} fontWeight={"bold"}>
                  Something went wrong. Please try again
                </Text>
              ) : undefined}
              {isLoading == true ? (
                <Button disabled={true}>Sign in</Button>
              ) : (
                <Button
                  onClick={async () => {
                    setIsLoading(true);
                    if (
                      (await firebaseObject.elevatedUserSignIn(email, password))
                        .isSuccess
                    ) {
                      setIsSignedIn(true);
                      window.location.href = "/admin/orders";
                    } else {
                      setIsSignedIn(false);
                    }
                    setIsLoading(false);
                  }}
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
