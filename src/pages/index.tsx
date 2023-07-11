import { Button, Center, Image, Box, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function Home() {
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    console.log('useEffect kepanggil');
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bgColor="black"
    >
      {condition === false ? (
        <Button onClick={() => setCondition(!condition)} colorScheme="telegram">
          Click Me
        </Button>
      ) : null}

      {condition === true ? (
        <Box
          minH="100vh"
          minW="100%"
          px="10px"
          bgGradient="radial(green.200, pink.500)"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize={{ base: "2xl", sm: "4xl" }}
            textAlign="center"
            fontWeight="bold"
            fontFamily="monospace"
          >
            <ArrowLeftIcon />
            Introduction Page !
            <ArrowRightIcon />
          </Text>
          <Box
            marginTop="1em"
            paddingY={{ base: "10px", sm: "20px" }}
            border="solid"
            borderColor="purple.700"
            bgColor="purple.700"
            boxShadow="xl"
            borderRadius="20px"
            display="flex"
            w="80%"
            flexDirection={{ base: "row", sm: "column" }}
            justifyContent={{ base: "none", sm: "center" }}
          >
            <Image
              src="/123.jpg"
              alt="Profile Picture"
              objectFit="cover"
              alignSelf="center"
              objectPosition="center"
              boxSize={{ base: "50%", sm: "200px", md: "250px" }}
              borderRadius={{ base: "20px", sm: "full" }}
              marginLeft={{ base: "10px", sm: "0px" }}
              marginBottom={{ base: "none", sm: "1em" }}
            />
            <Box
              fontSize={{ base: "13px", sm: "20px", md: "30px" }}
              textAlign="center"
              fontWeight="bold"
              fontFamily="monospace"
              color="white"
              marginLeft="10px"
              paddingY="10px"
              display="flex"
              flexDir="column"
              justifyContent="space-evenly"
              rowGap={{ base: "0", sm: "5px" }}
            >
              <Text>NAMA: Elbert Chailes</Text>
              <Text>NIM: 19622127</Text>
              <Text>FAKULTAS: STEI-K</Text>
              <Text>JURUSAN: TEKNIK INFORMATIKA</Text>
              <Text>UMUR: 18 TAHUN</Text>
            </Box>
          </Box>
          <Box
            marginTop={{ base: "10px", sm: "20px" }}
            w={{ base: "70%", sm: "60%", md:"40%" }}
            display="flex"
            flexDir="row"
            justifyContent="space-evenly"
          >
            <Link href="https://github.com/ChaiGans" isExternal>
              <Image
                src="/github.svg"
                alt="github icon"
                width={{ base: "20px", sm: "40px" }}
              ></Image>
            </Link>
            <Link href="https://www.instagram.com/elbertchailes/" isExternal>
              <Image
                src="/instagram-svgrepo-com.svg"
                alt="ig icon"
                width={{ base: "20px", sm: "40px" }}
              ></Image>
            </Link>
            <Link
              href="https://api.whatsapp.com/send/?phone=628994960697&text&type=phone_number&app_absent=0"
              isExternal
            >
              <Image
                src="/whatsapp-svgrepo-com.svg"
                alt="wa icon"
                width={{ base: "20px", sm: "40px" }}
              ></Image>
            </Link>
            <Link
              href="https://www.linkedin.com/in/elbert-chailes-b497a9241/"
              isExternal
            >
              <Image
                src="/linkedin.svg"
                alt="in icon"
                width={{ base: "20px", sm: "40px" }}
              ></Image>
            </Link>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
