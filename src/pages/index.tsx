import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Spacer,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Home() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log("useEffect kepanggil");
  }, []);

  return (
    <Center minH="100vh" bgColor="#01102e" color="blue.700">
      {/* {counter}
      <Button ml={10} onClick={() => setCounter(counter + 1)}>
        Increment
      </Button>
      <Button ml={10} onClick={() => setCounter(0)}>
        Reset
      </Button> */}
      <SelfIntroduction />
    </Center>
  );
}

function SelfIntroduction() {
  const interest: Array<string> = [
    "Software Engineer",
    "Front End Web Developer",
    "Artificial Intelligence",
  ];

  const [text] = useTypewriter({
    words: interest,
    loop: 0,
  });

  interface User {
    name: string;
    nickname: string;
    age: number;
    degree: string;
    university: string;
    universityYear?: number;
    interest?: Array<string>;
  }

  const universityYearTitle: Array<string> = [
    "Freshman",
    "Sophomore",
    "Penultimate",
    "Senior",
  ];

  const userData: User = {
    name: "Nyoman Ganadipa Narayana",
    nickname: "Gana",
    age: 18,
    degree: "Informatics Engineering",
    university: "Institut Teknologi Bandung",
    universityYear: 2,
    interest,
  };

  let currentInterest: string = userData.interest?.[0] ?? "";

  return (
    <Box
      w={{ base: "85%", sm: "70%", md: "50%" }}
      h="auto"
      bgGradient="linear(to-br, cyan.600, purple.700, pink.800)"
      padding="5px"
      // paddingBottom="45px"
      borderRadius="1rem"
    >
      <Flex
        bgColor="#f7f7f7"
        borderRadius="1em"
        padding="5%"
        direction={{ base: "column", lg: "row" }}
        align="center"
        justify="center"
        gap={{ base: "15px" }}
      >
        <Spacer />
        <Box
          boxSize={{ base: "200px", md: "230px", lg: "250px" }}
          borderRadius="full"
          border="3px solid blue.200"
          overflow="hidden"
        >
          <Image
            src="https://drive.google.com/uc?export=view&id=1qkQN0VOg_TAWsODqoxvqzl7jPAZtui0y
          "
            objectFit="cover"
            alt="Photo of Nyoman Ganadipa Narayana"
          />
        </Box>
        <Spacer />
        <Flex
          direction="column"
          w={{ sm: "100%", lg: "40%" }}
          color="blue.700"
          fontWeight="Bold"
          fontSize={{ base: "0.9rem", lg: "1.1rem" }}
          gap={{ base: "15px" }}
        >
          <Text>
            Hello, I&apos;m{" "}
            <Box as="span" color="blue.200">
              {userData.nickname}
            </Box>
            . My full name is{" "}
            <Box as="span" color="blue.200">
              {userData.name}
            </Box>
            .
          </Text>
          <Spacer />
          <Text>
            I am{" "}
            <Box as="span" color="blue.200">
              {userData.age}
            </Box>{" "}
            years old and currently{" "}
            <Box as="span" color="blue.200">
              {userData.universityYear
                ? "a " + universityYearTitle[userData.universityYear - 1]
                : "an undergraduate student"}{" "}
            </Box>
            in {""}
            <Box as="span" color="blue.200">
              {userData.degree}
            </Box>{" "}
            at {userData.university}.
          </Text>
          <Spacer />
          <Text>
            I&apos;m also incredibly enthusiastic about <br />
            <Box as="span" color="blue.200">
              {text}
            </Box>
            <Box as="span" color="red.200">
              <Cursor cursorStyle="<" />
            </Box>
          </Text>
        </Flex>
        <Spacer />
      </Flex>
      <Flex justify="end" margin={"5px"}>
        <Link href="https://www.instagram.com/gana.dipa/" isExternal>
          <Button colorScheme="blue" bgColor="f7f7f7">
            More information
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
