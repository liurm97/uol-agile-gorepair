import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

interface Feature {
  heading: string;
  description: string;
  iconUrl: string;
  iconAlt: string;
}

const Card = ({ heading, description, iconUrl, iconAlt }: Feature) => {
  return (
    <Box
      maxW={{ base: 'full', sm: '150px', md: '275px' }}
      w={{ base: 'full', md: 'calc(25% - 1rem)' }}
      borderWidth="1px"
      borderColor="black"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          <Image src={iconUrl} alt={iconAlt} boxSize={10} />
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function ServiceGridList() {
  return (
    <Box p={4} bg="gray.100">
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Our Services
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Explore the wide range of repair services we offer.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gap={4} justify="center">
          <Card
            heading={'Electrical'}
            iconUrl="https://www.svgrepo.com/show/75634/electric-current-symbol.svg"
            iconAlt="Electrical Icon"
            description={'Comprehensive electrical repair and installation services for your home or business.'}
          />
          <Card
            heading={'Plumbing'}
            iconUrl="https://www.svgrepo.com/show/283208/plumbering-plumber.svg"
            iconAlt="Plumbing Icon"
            description={'Expert plumbing solutions, from leak repairs to fixture installations, ensuring reliable water flow.'}
          />
          <Card
            heading={'Woodwork'}
            iconUrl="https://www.svgrepo.com/show/28040/carpentry.svg"
            iconAlt="Woodwork Icon"
            description={'Custom woodwork services, including furniture repair and bespoke carpentry, tailored to your needs.'}
          />
          <Card
            heading={'Handyman'}
            iconUrl="https://www.svgrepo.com/show/485927/tools.svg"
            iconAlt="Handyman Icon"
            description={'Versatile handyman services for all your home maintenance and improvement projects.'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
