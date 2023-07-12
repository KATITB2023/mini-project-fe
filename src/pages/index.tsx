import { Box, Button, Center, Container, Flex, Heading, Stack, VStack, Text, Input, Checkbox } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
   // add task
   const handleAddTask = () => {
    if (inputValue !== '') {
      setTasks([
        ...tasks,
        { id: Date.now(), text: inputValue, completed: false },
      ]);
      setInputValue('');
    }
  };
   // checklist
   const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Center minH='100vh'>
      <Box w={'auto'} h={'auto'} shadow={'2xl'} rounded={'xl'} p={4}>
        <VStack w={'full'} h={'full'} spacing={4}>
          <Heading>My Profile</Heading>
          <Box h={'auto'} w={'auto'}>
            <Stack direction={['column', 'row']} >
              <Box h={150} w={150} bgImage={"url('https://source.unsplash.com/3tYZjGSBwbk')"} borderRadius = {'full'} alignSelf={'center'}></Box>
              <Flex direction={'column'} justify={'center'} gap={4}>
                <Flex gap={2} direction={'column'}>
                  <Text>
                    Nama
                  </Text >
                  <Text>
                    Akmal Natha Abhirama
                  </Text>
                </Flex>
                <Flex gap={2} direction={'column'}>
                  <Text mb={2}>
                    NIM
                  </Text >
                  <Text mb={5}>
                    18221082
                  </Text>
                </Flex>
              </Flex>
            </Stack>
          </Box>
          <Stack direction="row" mb={4} w={'full'}>
            <Input
              placeholder="Tambah Kegiatan!"
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button>Add</Button>
          </Stack>
          {tasks.length != 0 ? (
            <Flex justify="space-between" align="center">
              <Checkbox >

              </Checkbox>
            </Flex>
          ) : (<Text>Belum ada To Do List</Text>)}
        </VStack>
      </Box>
    </Center>
  );
}
