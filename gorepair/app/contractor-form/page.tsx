"use client";

import { Box, Center, Fade, Heading, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import RegistrationForm from "@/components/ContractorForm";

export default function Form() {
  const [data, setData] = useState<{
    name: string;
    email: string;
    service: string;
  }>();

  // Function to render text with line breaks after each sentence
  const renderTextWithLineBreaks = (text: string) => {
    const sentences = text.split(/(?<=[.!?])\s/);
    return sentences.map((sentence, index) => (
      <Text key={index}>
        {sentence}
        <br />
      </Text>
    ));
  };

  return (
    <Center height="100vh" width="100vw">
      <Box background="gray.50" borderRadius="md" shadow="md" padding="6">
        <Fade in={!data} unmountOnExit>
          <Heading textAlign="center">Become a GoRepair Contractor!</Heading>
          <Box height="2rem"></Box>
          <VStack spacing={4}>
            {renderTextWithLineBreaks(
              "Enter your details below and we'll get back to you within 48 hours."
            )}
          </VStack>
          <Box height="2rem"></Box>

          <RegistrationForm onRegistered={(formData) => setData(formData)} />
        </Fade>
        <Fade in={!!data} unmountOnExit>
          <Box maxWidth={"xl"}>
            <Heading textAlign="center">Thank You For Applying!</Heading>
            <Box height="2rem"></Box>
            <VStack spacing={4}>
              {renderTextWithLineBreaks(
                `We have received your GoRepair contractor application for the service: ${data?.service}. We look forward to the possibility of working together. If you are accepted, you will receive an email via ${data?.email}.`
              )}
            </VStack>
          </Box>
        </Fade>
      </Box>
    </Center>
  );
}
