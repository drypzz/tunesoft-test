import React, { useState, useEffect } from 'react';

import { Container, TextField, Button, AlertTitle, Divider, Box, createTheme, ThemeProvider, List } from '@mui/material';

import TasksInputsProps from './utils/Input.props.ts';

import ListTasks from './components/List.tsx';

import axios from 'axios';
const API_URL = 'http://localhost:5000/tasks';

const themeMode = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string; completed: boolean }[]>([]);

  const [newTask, setNewTask] = useState<TasksInputsProps>({
    title: '',
    description: '',
  });

  const addTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        const response = await axios.post(API_URL, { ...newTask, completed: false });
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '' });
      } catch (error) {
        console.error("Erro ao adicionar a tarefa:", error);
      }
    } else {
      alert('Please enter a task title and description');
    }
  };

  const editTask = async (id: number, newTitle: string, newDescription: string) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { title: newTitle, description: newDescription });
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Erro ao editar a tarefa:", error);
    }
  };

  const toggleTaskCompletion = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        if (!task.completed) {
          if (!window.confirm('Are you sure the task is complete?')) return;
        };

        const response = await axios.patch(`${API_URL}/${id}`, { completed: !task.completed });
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
      } catch (error) {
        console.error("Erro ao alterar o estado da tarefa:", error);
      }
    }
  };

  const deleteTask = async (id: number) => {
    try {

      if (!window.confirm('Are you sure you want to delete this task?')) return;

      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Erro ao carregar as tarefas:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={themeMode}>
      <Container>
        <Box sx={{ margin: '30px 0' }}>
          <h1 style={{ textAlign: 'center', color: '#1976d2' }}>
            Tunesoft - Tasks
          </h1>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Title'
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            variant='outlined'
            required
            fullWidth
          />
          <TextField
            label='Description'
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            variant='outlined'
            required
            fullWidth
          />
        </Box>
        <Box sx={{ margin: '30px 0' }}>
          <Button onClick={addTask} variant='contained' color='primary'>
            Create Task
          </Button>
        </Box>
        <Box sx={{ margin: '30px 0' }}>
          <Divider>
            <AlertTitle sx={{ color: "rgba(255, 255, 255, 0.7)", userSelect: 'none' }}>
              Task List
            </AlertTitle>
          </Divider>
          {tasks.length >= 1 ? (
            <>
              <List
                style={{
                  border: tasks.length > 8 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  height: tasks.length > 8 ? '500px' : 'auto',
                  overflowY: tasks.length > 8 ? 'scroll' : 'hidden',
                  textAlign: 'center',
                }}
              >
                <ListTasks
                  tasks={tasks}
                  onEdit={editTask}
                  onComplete={toggleTaskCompletion}
                  onDelete={deleteTask}
                />
              </List>
            </>
          ) : (
            <>
              <AlertTitle sx={{
                  marginTop: '20px',
                  textAlign: 'center',
                  color: "red",
                  padding: '15px',
                  borderRadius: '5px',
                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                  userSelect: 'none'
                }}>
                No tasks found!
              </AlertTitle>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
