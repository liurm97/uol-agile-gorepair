import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Flex,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Faq() {
    const bgColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box bg={bgColor} py={10} px={4}>
          <Flex
            textAlign="center"
            justifyContent="center"
            direction="column"
            width="full"
            overflow="hidden">
            <Container maxW="container.xl">
              <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight="bold" mb={10}>
                Frequently Asked Questions (FAQ)
              </Heading>
              <Accordion defaultIndex={[0]} allowMultiple>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="center">
                          <Text fontWeight="bold">Is emergency service available 24/7?</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Yes, our emergency services are available 24/7 to address any urgent repairs or issues you might encounter.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="center">
                          <Text fontWeight="bold">Do you provide services for commercial properties?</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Absolutely, GoRepair offers a wide range of services tailored for commercial properties, including maintenance, repairs, and installations.
                    </AccordionPanel>
                </AccordionItem>

                 <AccordionItem>
                    <h2>
                    <AccordionButton>
                        <Box as="span" flex="1" textAlign="center">
                          <Text fontWeight="bold">What payment methods do you provide?</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                    Currently we provide credit/debit card, however are working on adding new payment methods.
                    </AccordionPanel>
                </AccordionItem>

              </Accordion>
            </Container>
          </Flex>
        </Box>
    );
}
