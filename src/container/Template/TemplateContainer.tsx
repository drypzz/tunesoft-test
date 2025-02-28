import React from 'react';

// Componentes do MUI
import { 
   Container, 
   TextField, 
   Button, 
   Box, 
   createTheme, 
   ThemeProvider, 
   // AlertTitle, 
   // Divider, 
   // List 
} from '@mui/material';

// Componentes do card
import { CardBacklogComponents } from '../../components/CardBacklog/CardBacklogComponents.tsx';
import { ICardBacklogComponentsProps } from "../../components/CardBacklog/CardBacklogComponents.types";

// Regras do TemplateContainer
import { useTemplateContainerRules } from './TemplateContainer.rules.ts';


// Tema do projeto
const themeMode = createTheme({
   palette: {
      mode: 'dark',
   },
});

export const TemplateContainer = () => {
   const {
      // loading, 
      // tasks,
      newTask,
      // setNewTask, 
      addTask, 
      // editTask, 
      // toggleTaskStatus, 
      // deleteTask 
   } = useTemplateContainerRules();
  
   const issues: ICardBacklogComponentsProps[] = [
      {
        order: 1,
        id: 10,
        title: "Ajustes na logica do carrinho do site",
        createdBy: "Lincoln",
        state: "Fazendo",
        tags: ["CARRINHO"],
        tasks: [
          {
            id: 101,
            title: "Criar lógica de adicionar produto ao carrinho", // maximo de 215 caracteres
            assignedTo: "Gustavo",
            state: "Feito",
            description: "Pegue o incone de adicionar ao carrinho e faça a lógica de adicionar o produto ao carrinho",
          },
          {
            id: 102,
            title: "Criar lógica de remover produto do carrinho",
            assignedTo: "Gustavo",
            state: "Fazendo",
            description: "Pegue o incone de remover do carrinho e faça a lógica de remover o produto do carrinho",
          },
          {
            id: 103,
            title: "Criar lógica de calcular o valor total do carrinho",
            assignedTo: "Gustavo",
            state: "A Fazer",
            description: "Calcular o valor total do carrinho e exibir na tela",
          },
          {
            id: 104,
            title: "Criar lógica de calcular o valor total do carrinho",
            assignedTo: "Gustavo",
            state: "A Fazer",
            description: "Calcular o valor total do carrinho e exibir na tela",
          },
          {
            id: 105,
            title: "Criar lógica de calcular o valor total do carrinho",
            assignedTo: "Gustavo",
            state: "A Fazer",
            description: "Calcular o valor total do carrinho e exibir na tela",
          },
          {
            id: 106,
            title: "Criar lógica de calcular o valor total do carrinho",
            assignedTo: "Gustavo",
            state: "A Fazer",
            description: "Calcular o valor total do carrinho e exibir na tela",
          },
          {
            id: 107,
            title: "Criar lógica de calcular o valor total do carrinho",
            assignedTo: "Gustavo",
            state: "A Fazer",
            description: "Calcular o valor total do carrinho e exibir na tela",
          },
        ]
      },
      {
        order: 2,
        id: 11,
        title: "Ajustes no layout do site",
        createdBy: "Lincoln",
        state: "A Fazer",
        tags: ["LAYOUT", "FRONTEND"],
        tasks: [
          {
            id: 111,
            title: "Ajustar o layout da página de produtos",
            assignedTo: "Lincoln",
            state: "Feito",
            description: "Ajustar o layout da página de produtos para que fique responsivo",
          },
          {
            id: 112,
            title: "Ajustar o layout da página de carrinho",
            assignedTo: "Lincoln",
            state: "Fazendo",
            description: "Ajustar o layout da página de carrinho para que fique responsivo",
          },
        ]
      },
      {
        order: 3,
        id: 12,
        title: "Fazer lógica do site",
        createdBy: "Gustavo",
        state: "Feito",
        tags: [],
        tasks: []
      }
   ];

  return (
    <ThemeProvider theme={themeMode}>

      <Container>

        {/* Título do projeto */}
        <Box sx={{ margin: '30px 0' }}>
          <h1 style={{ textAlign: 'center', color: '#90caf9' }}>
            GL - Taskers
          </h1>
        </Box>

        {/* Inputs para adicionar uma nova tarefa 
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
        </Box> */}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
               label='Digite o título da issue'
               value={newTask.title}
               onChange={() => {}}
               variant='outlined'
               required
               fullWidth
            />
            <TextField
               label='Digite a tag da issue'
               value={newTask.title}
               onChange={() => {}}
               variant='outlined'
               fullWidth
            />
        </Box>

        {/* Botão para adicionar uma nova tarefa */}
        <Box sx={{ margin: '30px 0' }}>
          <Button onClick={addTask} variant='contained' color='primary'>
            Criar Issue 
          </Button>
        </Box>

         {/* Lista de tarefas 
        <Box sx={{ margin: '30px 0' }}>

          <Divider>
            <AlertTitle sx={{ color: 'rgba(255, 255, 255, 0.7)', userSelect: 'none' }}>
              Task List
            </AlertTitle>
          </Divider>

          {loading ? (
            <Box>
              <AlertTitle sx={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)', userSelect: 'none' }}>
                Loading tasks...
              </AlertTitle>
            </Box>
          ) : (
            <>
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
        </Box>*/}

         <Box sx={{ width: '100%', mx: "auto", mt: 4 }}>
            {issues.map((issues) => (
               <CardBacklogComponents key={issues.id} {...issues} />
            ))}
         </Box>

      </Container>

    </ThemeProvider>
  );
};
