import { Button, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function PageBaru() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('useEffect kepanggil');
  }, []);

  return (
    <Center minH='100vh' bgColor={{ base: '#FFFFFF', lg: '#000000' }}>
      {counter}
      <Button ml={10} onClick={() => setCounter(counter + 1)}>
        Increment
      </Button>
      <Button ml={10} onClick={() => setCounter(0)}>
        Reset
      </Button>
    </Center>
  );
}
