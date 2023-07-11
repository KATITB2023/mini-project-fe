import React, { useState } from 'react';
import {
  Heading,
  Input,
  Stack,
  Button,
  Checkbox,
  VStack,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // add task
  const handleAddTask = () => {
    if (inputValue.trim() !== '') {
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

  // delete task
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // edit task
  const handleEditTask = (id: number, text: string) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  // save edit
  const handleSaveTask = () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === editingTaskId) {
          return { ...task, text: editingTaskText };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };

  // cancel edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  return (
    <VStack p={4}>
      <Heading mb={4}>To-Do List</Heading>
      <Stack direction="row" spacing={2} mb={4}>
        <Input
          placeholder="Masukkin kegiatan kamu!"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleAddTask}>Add</Button>
      </Stack>
      {tasks.length === 0 ? (
        <Text>Kamu gabut!</Text>
      ) : (
        <VStack align="start" spacing={2} w="100%">
          {tasks.map((task) => (
            <Box
              key={task.id}
              w="100%"
              _hover={{ bg: 'gray.100' }}
              p={2}
              borderRadius="md"
            >
              <Flex justify="space-between" align="center">
                {editingTaskId === task.id ? (
                  <>
                    <Input
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                    />
                    <Flex>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="green"
                        onClick={handleSaveTask}
                      >
                        Save
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Checkbox
                      isChecked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    >
                      {task.text}
                    </Checkbox>
                    <Flex>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="yellow"
                        onClick={() => handleEditTask(task.id, task.text)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </Flex>
                  </>
                )}
              </Flex>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  );
}
