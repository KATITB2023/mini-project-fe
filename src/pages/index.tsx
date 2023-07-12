import { Box, Button, Center, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleButtonClick = () => {
    // Logika saat tombol diklik
  };

  return (
    <Center minH="100vh" bgColor="#0f0f19">
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={6}
        maxW="800px"
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bgColor="#04030c"
      >
        <VStack align="center" spacing={6} justify="center">
          <Heading as="h1" size="2xl" color="white" textAlign="center">
            Welcome to My Galactic Website
          </Heading>
          <Text fontSize="xl" color="gray.300" textAlign="center">
            Thank you for visiting! Explore the wonders of the galaxy with me.
          </Text>
          <Text fontSize="lg" color="gray.300" textAlign="center">
            Discover stunning images, fascinating facts, and more.
          </Text>
          <Button colorScheme="teal" size="lg" onClick={handleButtonClick}>
            Explore Now
          </Button>
        </VStack>
        <Box textAlign="center">
          <Image
            src="/galaxy.jpg"
            alt="Galaxy"
            boxSize="300px"
            objectFit="cover"
            borderRadius="md"
            mx="auto"
          />
          <Text fontSize="lg" fontWeight="bold" color="white" mt={4}>
            Developer:
          </Text>
          <Text fontSize="lg" color="gray.300">Ulivia Embun - Social</Text>
        </Box>
      </Grid>
    </Center>
  );
};

export default Home;