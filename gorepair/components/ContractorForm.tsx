import { useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Center,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { firebaseObject } from "@/app/config/firebaseConfig";

interface IRegistration {
  name: string;
  email: string;
  service: string;
}

interface IRegistrationFormProps {
  onRegistered: (data: IRegistration) => void;
}

export default function RegistrationForm({
  onRegistered,
}: IRegistrationFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [serviceRegistered, setServiceRegistered] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IRegistration>();

  return (
    <Center pt={8} px={4} style={{ marginBottom: "50px" }}>
      <Card width="full" maxWidth="500px">
        <form onSubmit={handleSubmit(onRegistered)} noValidate>
          <CardHeader>
            <Heading textAlign="center" mb={4}>
              Contractor Registration
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Full Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Your Name"
                  {...register("name", {
                    required: "Please enter your full name.",
                  })}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">E-Mail Address</FormLabel>
                <Input
                  id="email"
                  placeholder="youremail@gorepair.com"
                  type="email"
                  {...register("email", {
                    required: "Please enter your email.",
                  })}
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.service}>
                <FormLabel htmlFor="service">Service</FormLabel>
                <Select
                  id="service"
                  placeholder="Select service"
                  {...register("service", {
                    required: "Please select your service.",
                  })}
                >
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Woodwork">Woodwork</option>
                  <option value="Handyman">Handyman</option>
                </Select>
                <FormErrorMessage>{errors.service?.message}</FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
                onClick={() => {}}
              >
                Register
              </Button>
            </VStack>
          </CardBody>
        </form>
      </Card>
    </Center>
  );
}
