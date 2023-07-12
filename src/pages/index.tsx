import { Box, Center, Heading, Text, Link, Stack, HStack, IconButton, Image, Flex, ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import "@fontsource/montserrat";


export default function Home() {
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    console.log("useEffect kepanggil");
  }, []);

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        bgImage={`url("/images/Desktop.PNG")`}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        <Center minH="100vh" bg="rgba(0, 0, 0, 0.5)">
          {!condition ? (
            <Box
              px="4"
              py="8"
              maxW={{ base: "90%", sm: "80%", md: "70%", lg: "60%" }}
              bg="white"
              boxShadow="lg"
              borderRadius="xl"
            >
              <Flex flexDirection={{ base: "column", md: "row" }} alignItems={{ base: "center", md: "flex-start" }}>
                <Image
                  src="/images/LINE_ALBUM_JAMAL ITB 22_230210_72.jpg"
                  alt="Your Picture"
                  boxSize={{ base: "150px", md: "200px" }}
                  borderRadius="full"
                  mb={{ base: "4", md: "0" }}
                  mr={{ base: "0", md: "4" }}
                  objectFit="cover"
                  objectPosition="center"
                />
                <Stack spacing="4">
                  <Heading as="h1" size="xl" textAlign={{ base: "center", md: "left" }} fontFamily="Montserrat">
                    Introduction Page
                  </Heading>
                  <Text fontSize="lg" textAlign={{ base: "center", md: "left" }} mb="6" fontFamily="Montserrat">
                    Hi, my name is Filbert.
                  </Text>
                  <Stack spacing="4">
                    <Box>
                      <Text fontSize="lg" fontWeight="bold" fontFamily="sans-serif">
                        About Me:
                      </Text>
                      <Text fontFamily="Montserrat">
                        A Sophomore in Informatics Engineering at ITB
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">
                        Education:
                      </Text>
                      <Text fontFamily="Montserrat">Teknik Informatika</Text>
                      <Text fontFamily="Montserrat">Institut Teknologi Bandung</Text>
                    </Box>
                    <Box>
                      <Text fontSize="lg" fontWeight="bold">
                        Contact Information:
                      </Text>
                      <Text fontFamily="Montserrat">
                        Email:{" "}
                        <Link href="mailto:filbertfilbert21@gmail.com">filbertfilbert21@gmail.com</Link>
                      </Text>
                      <Text fontFamily="Montserrat">Phone: +62 85314702004</Text>
                    </Box>
                  </Stack>
                </Stack>
              </Flex>
              <HStack justifyContent="center" mt="6">
                <IconButton
                  as={Link}
                  href="https://github.com/filbert88"
                  colorScheme="blue"
                  icon={<FaGithub />}
                  isExternal
                  aria-label="GitHub"
                />
                <IconButton
                  as={Link}
                  href="https://www.instagram.com/filbert901"
                  colorScheme="purple"
                  icon={<FaInstagram />}
                  isExternal
                  aria-label="Instagram"
                />
                <IconButton
                  as={Link}
                  href="https://api.whatsapp.com/send/?phone=85314702004"
                  colorScheme="green"
                  icon={<FaWhatsapp />}
                  isExternal
                  aria-label="WhatsApp"
                />
                <IconButton
                  as={Link}
                  href="https://www.linkedin.com/in/Filbert135"
                  colorScheme="blue"
                  icon={<FaLinkedin />}
                  isExternal
                  aria-label="LinkedIn"
                />
              </HStack>
            </Box>
          ) : null}
        </Center>
      </Box>
    </ChakraProvider>
  );
}