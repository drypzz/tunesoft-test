import React, { useState } from 'react';

// Importando os componentes do Material-UI
import { Container, TextField, Button, AlertTitle, Divider, Box, createTheme, ThemeProvider, List } from '@mui/material';

import TasksInputsProps from './App.props';

// Criando o tema light
const themeMode = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Componente principal
const App = () => {

  // Estado para controlar a nova tarefa  
  const [newTasks, setNewTask] = useState<TasksInputsProps>({
    title: '',
    description: '',
  });
  
  return (
    <ThemeProvider theme={themeMode}>
      <Container>
        <Box
          style={{
            margin: '30px 0px',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              color: '#1976d2'
            }}>
            Tunesoft - Tasks
          </h1>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <Box>
            <TextField
              label='Title'
              value={newTasks.title}
              onChange={(e) => setNewTask({ ...newTasks, title: e.target.value })}
              variant='outlined'
              required
              fullWidth
            />
          </Box>
          <Box>
            <TextField
              label='Description'
              value={newTasks.description}
              onChange={(e) => setNewTask({ ...newTasks, description: e.target.value })}
              variant='outlined'
              required
              fullWidth
            />
          </Box>
        </Box>
        <Box
          style={{
            margin: '30px 0px',
          }}
        >
          <Button
            onClick={() => console.log("Created")}
            variant='contained'
            color='primary'
          >
            Create Task
          </Button>
        </Box>
        <Box
          style={{
            margin: '30px 0px',
          }}
        >
          <Divider>
            <AlertTitle
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                userSelect: 'none',
              }}
            >
              Task list
            </AlertTitle>
          </Divider>
          <List>
            <Box
              style={{
                textAlign: 'center',
              }}
            >
              <AlertTitle
                style={{
                  textAlign: 'center',
                  backgroundColor: '#ff000020',
                  borderRadius: 10,
                  padding: 20,
                  color: 'red',
                  userSelect: 'none',
                }}
              >
                No tasks found !
              </AlertTitle>
            </Box>
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
