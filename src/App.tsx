import React, { useState, useEffect } from 'react';

// Componentes do MUI
import { Container, TextField, Button, AlertTitle, Divider, Box, createTheme, ThemeProvider, List } from '@mui/material';

// Props do input
import TasksInputsProps from './utils/Input.props.ts';

// Componente Task
import ListTask from './components/List.tsx';

// Axios
import axios from 'axios';
const API_URL = 'http://localhost:5000/tasks'; // URL da API

// Tema do projeto
const themeMode = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {

  const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

  const [tasks, setTasks] = useState<{ 
    id: number;
    title: string;
    description: string;
    status: string
  }[]>([]); // Estado das tarefas

  const [newTask, setNewTask] = useState<TasksInputsProps>({
    title: '',
    description: '',
  }); // Estado do input

  // Adicionar uma nova tarefa
  const addTask = async () => {
    if (newTask.title.trim() && newTask.description.trim()) {
      try {
        const response = await axios.post(API_URL, { ...newTask, status: 'default' });
        setTasks([...tasks, response.data]);
        setNewTask({ title: '', description: '' });
      } catch (error) {
        console.error('Error creating task:', error);
      }
    } else {
      alert('Please enter a task title and description');
    }
  };

  // Editar uma tarefa
  const editTask = async (id: number, newTitle: string, newDescription: string) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, { title: newTitle, description: newDescription });
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Alternar o status da tarefa
  const toggleTaskStatus = async (id: number, status: string) => {
    const task = tasks.find(task => task.id === id);
    if (task) {
      try {
        const response = await axios.patch(`${API_URL}/${id}`, { status: status });
        setTasks(tasks.map(t => (t.id === id ? response.data : t)));
      } catch (error) {
        console.error('Error completing task:', error);
      }
    }
  };

  // Deletar uma tarefa
  const deleteTask = async (id: number) => {
    try {

      if (!window.confirm('Are you sure you want to delete this task?')) return;

      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Carregar as tarefas
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <ThemeProvider theme={themeMode}>

      <Container>

        {/* Título do projeto */}
        <Box sx={{ margin: '30px 0' }}>
          <h1 style={{ textAlign: 'center', color: '#90caf9' }}>
            Tunesoft - Tasks
          </h1>
        </Box>

        {/* Inputs para adicionar uma nova tarefa */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label='Type the task title'
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            variant='outlined'
            required
            fullWidth
          />
          <TextField
            label='Type the task description'
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            variant='outlined'
            required
            fullWidth
          />
        </Box>

        {/* Botão para adicionar uma nova tarefa */}
        <Box sx={{ margin: '30px 0' }}>
          <Button onClick={addTask} variant='contained' color='primary'>
            Create Task
          </Button>
        </Box>

        {/* Lista das tarefas */}
        <Box sx={{ margin: '30px 0' }}>

          <Divider>
            <AlertTitle sx={{ color: 'rgba(255, 255, 255, 0.7)', userSelect: 'none' }}>
              Task List
            </AlertTitle>
          </Divider>

          {/* Verifica se está carregando */}
          {loading ? (
            <Box>
              <AlertTitle sx={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', userSelect: 'none' }}>
                Loading tasks...
              </AlertTitle>
            </Box>
          ) : (
            <>
              {/* Verifica se existem tarefas */}
              {tasks.length >= 1 ? (
                <>
                  <List
                    sx={{
                      border: tasks.length > 5 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
                      borderRadius: '5px',
                      padding: '10px',
                      height: tasks.length > 5 ? '500px' : 'auto',
                      overflowY: tasks.length > 5 ? 'scroll' : 'hidden',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '2px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent',
                    }}
                  >
                    {/* Componente Task */}
                    <ListTask
                      tasks={tasks}
                      onEdit={editTask}
                      onComplete={toggleTaskStatus}
                      onDelete={deleteTask}
                    />
                  </List>
                </>
              ) : (
                <>
                  <AlertTitle sx={{
                      marginTop: '20px',
                      textAlign: 'center',
                      color: 'red',
                      padding: '15px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      userSelect: 'none'
                    }}>
                    No tasks found!
                  </AlertTitle>
                </>
              )}
            </>
          )}
        </Box>

      </Container>

    </ThemeProvider>
  );
};

export default App;
