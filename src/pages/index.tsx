import { Button, Center, Heading, IconButton, Input, Stack, useColorMode, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    console.log('useEffect kepanggil');
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  return (
    <Center minH='100vh' bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
      <VStack spacing={4} align='stretch' w='full' maxW='400px' p={4}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Heading as='h1' size='lg' textAlign='center' color={colorMode === 'light' ? 'gray.700' : 'gray.200'}>
            Simple To Do List
          </Heading>
          <IconButton
            aria-label='Toggle Dark/Light mode'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant='ghost'
          />
        </Stack>
        <Stack direction='row'>
          <Input
            placeholder='New task'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            bg={colorMode === 'light' ? 'white' : 'gray.800'}
            color={colorMode === 'light' ? 'gray.800' : 'white'}
            _placeholder={{ color: colorMode === 'light' ? 'gray.400' : 'gray.600' }}
          />
          <Button onClick={addTask} bg={colorMode === 'light' ? 'gray.200' : 'gray.700'} color={colorMode === 'light' ? 'gray.800' : 'white'}>
            Add
          </Button>
        </Stack>
        {tasks.map((task, index) => (
          <Stack
            key={index}
            direction='row'
            justify='space-between'
            align='center'
            bg={colorMode === 'light' ? 'gray.200' : 'gray.700'}
            px={4}
            py={2}
            borderRadius='md'
          >
            <span>{task}</span>
            <Button onClick={() => removeTask(index)} bg='transparent' color={colorMode === 'light' ? 'gray.500' : 'gray.300'} _hover={{ bg: colorMode === 'light' ? 'gray.300' : 'gray.600' }}>
              Remove
            </Button>
          </Stack>
        ))}
        <Center as='footer' mt={4} color={colorMode === 'light' ? 'gray.500' : 'gray.300'} fontSize='sm'>
          Created by Austin Gabriel Pardosi, 2023 
          
        </Center>
      </VStack>
    </Center>
  );
}
