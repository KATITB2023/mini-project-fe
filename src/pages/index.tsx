import {
  Heading,
  Text,
  Button,
  Flex,
  Image,
  Box,
  calc,
  Fade,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { HamburgerIcon } from "@chakra-ui/icons";

interface dataAPIType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const useScreenWidth = (): number | null => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  useEffect(() => {
    const getWindowDimensions = (): number | null => {
      return typeof window !== "undefined" ? window.innerWidth : null;
    };

    const handleResize = () => {
      setScreenWidth(getWindowDimensions());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenWidth;
};

const Fetch = ({ endpoint }: { endpoint: string }): dataAPIType[] => {
  const [data, setData] = useState<dataAPIType[]>([]);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/${endpoint}?language=en-US`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDAwODZmMjExMGJhODMwZDEwZDM3ZDhjYTM0ZGFhMiIsInN1YiI6IjY0OGM4OWFhMDc2Y2U4MDBhZDcyYjlmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GBTW1UV81mVUui2vRmHF7HL31dcH_VJPtDfTaI5eBII",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setData(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [endpoint]);

  return data;
};

const Navbar = () => {
  const navWidth = useScreenWidth();

  return (
    <Flex
      justifyContent="space-between"
      pt="1rem"
      mx={{ base: "1rem", lg: "2rem" }}
      cursor="pointer"
    >
      <Box>
        <Image alt="logo" src="./images/Logo.png" />
      </Box>
      {navWidth && navWidth > 768 ? (
        <HStack>
          <Text _hover={{ color: "#37BCF8" }}>Movies</Text>
          <Text _hover={{ color: "#37BCF8" }}>TV Series</Text>
          <Text _hover={{ color: "#37BCF8" }}>Genre</Text>
          <Text _hover={{ color: "#37BCF8" }}>Year</Text>
          <Box>
            <Input
              type="text"
              placeholder="search..."
              size="xs"
              borderRadius="0.5rem"
              focusBorderColor="none"
            />
          </Box>
        </HStack>
      ) : (
        <Box>
          <HamburgerIcon boxSize={6} />
        </Box>
      )}
    </Flex>
  );
};

const Carousel = ({
  endpoint,
  category,
}: {
  endpoint: string;
  category: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);

  const dataAPI = Fetch({ endpoint });
  const screenWidth = useScreenWidth();

  let sliceCount: number = 0;
  if (screenWidth) {
    if (screenWidth < 480) {
      sliceCount = 4;
    } else if (screenWidth >= 480 && screenWidth < 768) {
      sliceCount = 5;
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      sliceCount = 6;
    } else if (screenWidth >= 1280) {
      sliceCount = 7;
    }
  }

  const handleHover = () => {
    setIsHover(!isHover);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide: number) =>
      prevSlide === dataAPI.length - sliceCount ? 0 : prevSlide + 1
    );
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide: number) =>
      prevSlide === 0 ? dataAPI.length - sliceCount : prevSlide - 1
    );
  };

  return (
    <Box
      mb="2rem"
      pos="relative"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Flex alignItems="center" justifyContent="space-between" pb="0.5rem">
        <Heading fontSize={{ base: "20px", lg: "24px" }}>{category}</Heading>
        <Text
          cursor="pointer"
          display={`${isHover ? `block` : `none`}`}
          fontSize={{ base: "14px", lg: "16px" }}
          opacity="0.8"
          _hover={{opacity: "1"}}
        >
          View All &gt;
        </Text>
      </Flex>
      <Flex
        pos="relative"
        alignItems={`center`}
        width="100%"
        justifyContent="space-between"
      >
        {isHover ? (
          <Box
            onClick={handlePrevSlide}
            zIndex="100"
            pos="absolute"
            height="100%"
            left="0"
            background="linear-gradient(88deg, #0f1014 0.62%,rgba(15,16,20,0) 99.33%);"
            width="75px"
          >
            <Button
              height="100%"
              colorScheme="transparent"
              fontSize="2xl"
              fontWeight="bold"
              color="gray.600"
              float="left"
            >
              &lt;
            </Button>
          </Box>
        ) : (
          ""
        )}
        {screenWidth &&
          dataAPI
            .slice(currentSlide, currentSlide + sliceCount)
            .map((item: dataAPIType, index: number) => (
              <Box
                width={{
                  base: `${calc(screenWidth / sliceCount - 20)}px`,
                  lg: "175px",
                }}
                key={index}
                cursor="pointer"
                _hover={{ opacity: "0.3" }}
              >
                <Fade in={true}>
                  <Image
                    borderRadius="8px"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt="logo"
                    className="w-full hover:opacity-50"
                  />
                </Fade>
              </Box>
            ))}
        {isHover ? (
          <Box
            zIndex="9999"
            pos="absolute"
            height="100%"
            right="0"
            background="linear-gradient(269.25deg, #0f1014 0.62%,rgba(15,16,20,0) 99.33%)"
            width="75px"
          >
            <Button
              onClick={handleNextSlide}
              float="right"
              height="100%"
              colorScheme="transparent"
              fontSize="2xl"
              fontWeight="bold"
              color="gray.600"
            >
              &gt;
            </Button>
          </Box>
        ) : (
          ""
        )}
      </Flex>
    </Box>
  );
};

const Home = () => {
  return (
    <Box bgColor="#000000" color="#ffffff">
      <Box maxW="1440px" margin="auto">
        <Navbar />
        <Box
          mx={["0.5rem", "1rem", "1.5rem", "2rem"]}
          p={["0.5rem", "1rem", "1.5rem", "2rem"]}
        >
          <Carousel category="Trending" endpoint="movie/popular" />
          <Carousel category="Upcoming" endpoint="movie/upcoming" />
          <Carousel category="Top Rated" endpoint="movie/top_rated" />
          <Carousel category="Top TV Series" endpoint="tv/top_rated" />
          <Carousel category="Airing Today" endpoint="tv/airing_today" />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
