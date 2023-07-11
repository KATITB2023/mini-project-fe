import { Box, Button, Container, Link, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

interface myContacts {
  id: number;
  icon: string;
  platform: string;
  username: string;
  link: string;
}

export default function Home() {
  const [show, setShow] = useState(false);

  const myContacts: myContacts[] = [
    {
      id: 1,
      icon: "https://cdn.icon-icons.com/icons2/2845/PNG/512/instagram_logo_icon_181283.png",
      platform: "Instagram",
      username: "@jcalebs_",
      link: "https://www.instagram.com/jcalebs_/",
    },
    {
      id: 2,
      icon: "https://pngimg.com/d/github_PNG58.png",
      platform: "Github",
      username: "Julian-Caleb",
      link: "https://github.com/Julian-Caleb",
    },
    {
      id: 3,
      icon: "https://static.vecteezy.com/system/resources/previews/018/930/585/original/linkedin-logo-linkedin-icon-transparent-free-png.png",
      platform: "LinkedIn",
      username: "juliancalebs",
      link: "https://www.linkedin.com/in/juliancalebs/",
    },
  ];

  return (
    <Container
      centerContent
      bgColor="#0C134F"
      minHeight="100vh"
      maxW="100vw"
      display="flex"
      flexDir="column"
      color="#eee"
    >
      {show === false && (
        <Button
          margin="2rem"
          width="200px"
          bgColor="#4942E4"
          color="#eee"
          variant="solid"
          onClick={() => setShow(true)}
        >
          Who am I?
        </Button>
      )}

      {show === true && (
        <>
          <Button
            margin="2rem"
            width="200px"
            bgColor="#4942E4"
            color="#eee"
            variant="solid"
            onClick={() => setShow(false)}
          >
            Hide me!
          </Button>

          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="80vh"
            justifyContent="space-around"
            alignItems="center"
            padding="0 10vw 0 10vw"
            textAlign="center"
          >
            <Text as="b" fontSize={{ base: "25px", sm: "33px", md: "50px" }}>
              You found me! <br />
              The creator of this page!
            </Text>

            <Image
              borderRadius="full"
              boxSize={{ base: "150px", md: "250px" }}
              src="https://media.licdn.com/dms/image/C5603AQFZoq70oI7vtw/profile-displayphoto-shrink_800_800/0/1661926241606?e=1694649600&v=beta&t=F3tpzw-q3AiyX6wNiwHFj29WvWpToVnbJLYHhoO9wfM"
              alt="Julian Caleb Simandjuntak"
            />

            <Text fontSize={{ base: "15px", sm: "18px", md: "20px" }}>
              Hi! My name is Julian Caleb Simandjuntak. I am an Informatics
              Engineering student class of 2022 at the Bandung Institute of
              Technology. My hobby is reading, both comic books, novels, and
              stories on social media. I have passion in web development
              especially front-end. Nice to meet you!
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="100%"
            justifyContent="space-around"
            alignItems="center"
            padding="0 10vw 0 10vw"
            textAlign="center"
          >
            <Text as="b" fontSize={{ base: "25px", sm: "33px", md: "50px" }}>
              Contacts
            </Text>

            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              width="100%"
              height="max-content"
              justifyContent="space-around"
              alignItems="center"
              padding="0 10vw 0 10vw"
              textAlign="center"
            >
              {myContacts.map((item: myContacts) => (
                <Box key={item.id} display="flex" flexDirection="column">
                  <Link href={item.link}>
                    <Image src={item.icon} alt={item.platform} boxSize="xs" />
                    <Text fontSize="md">{item.username}</Text>
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}
