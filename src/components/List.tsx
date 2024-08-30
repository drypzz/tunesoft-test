import React, { useState } from 'react';

// Componentes do MUI
import { Card, Typography, IconButton, TextField, Box, Menu, MenuItem, CardContent } from '@mui/material';
// Icones do MUI
import { Edit, Delete, Save, List as MenuIcon } from '@mui/icons-material';

// Props do componente Task
import { TaskProps } from '../utils/Tasks.props.ts';

// Props do input
import TasksInputsProps from '../utils/Input.props.ts';

// Componente TaskCard
const TaskCard = ({ id, title, description, status, onEdit, onDelete, onComplete}: TaskProps) => {

  const [editing, setEditing] = useState<boolean>(false); // Estado de edição

  const [editInputs, setEditInputs] = useState<TasksInputsProps>({
    title: title,
    description: description,
  }); // Estado do input de edição

  const [statusMenuAnchor, setStatusMenuAnchor] = useState<null | HTMLElement>(null); // Estado do menu de status

  const [currentStatus, setCurrentStatus] = useState<string>(status); // Estado do status atual

  // Função para editar uma tarefa
  const handleEdit = () => {
    if (editing) {
      onEdit(id, editInputs.title, editInputs.description);
    }
    setEditing(!editing);
  };

  // Função para salvar uma tarefa
  const handleSave = () => {
    if (editInputs.title.trim() && editInputs.description.trim()) {
      onEdit(id, editInputs.title, editInputs.description);
    } else {
      alert('Please enter a task title and description');
    }
    setEditing(false);
  };

  // Função para mudar o status de uma tarefa
  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    onComplete(id, status);
    setStatusMenuAnchor(null);
  };

  // Cor do status
  const statusColor = {
    'default': '#333',
    'doing': '#90caf9',
    'complete': '#469149'
  }[currentStatus];

  return (
    <>
      {/* Card da tarefa */}
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 2,
          mb: 2,
          bgcolor: editing ? '#444' : statusColor,
          color: '#fff',
        }}
      >
        {/* Conteúdo do card */}
        <CardContent>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              '@media screen and (max-width: 960px)': {
                flexDirection: 'column',
              },
            }}>

            {/* Menu de status */}
            <IconButton onClick={(event: React.MouseEvent<HTMLElement>) => setStatusMenuAnchor(event.currentTarget)}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={statusMenuAnchor}
              open={Boolean(statusMenuAnchor)}
              onClose={() => setStatusMenuAnchor(null)}
            >
              <MenuItem onClick={() => handleStatusChange('default')}>None</MenuItem>
              <MenuItem onClick={() => handleStatusChange('doing')}>Doing</MenuItem>
              <MenuItem onClick={() => handleStatusChange('complete')}>Complete</MenuItem>
            </Menu>
            
            {/* Verifica se está editando */}
            {editing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 2 }}>
                <TextField
                  value={editInputs.title}
                  onChange={(e) => setEditInputs({ ...editInputs, title: e.target.value })}
                  autoFocus
                  sx={{
                    '@media screen and (max-width: 960px)': {
                      width: '75vw',
                    },
                  }}
                  variant='outlined'
                  label='title'
                  fullWidth
                />
                <TextField
                  value={editInputs.description}
                  onChange={(e) => setEditInputs({ ...editInputs, description: e.target.value })}
                  multiline
                  sx={{
                    '@media screen and (max-width: 960px)': {
                      width: '75vw',
                    },
                  }}
                  variant='outlined'
                  label='Description'
                  fullWidth
                />
              </Box>
            ) : (
              <>
                {/* Título e descrição da tarefa */}
                <Box sx={{ flex: 1, alignItems: 'center', color: (currentStatus !== 'default' && currentStatus !== 'complete' ? '#000' : '#fff'), justifyContent: 'center' }}>
                  <Typography variant='h6' component='div'>
                    {title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' sx={{ color: (currentStatus !== 'default' && currentStatus !== 'complete' ? '#000' : '#fff') }}>
                    {description}
                  </Typography>
                </Box>
              </>
            )}

            {/* Botões de ação */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                '@media screen and (max-width: 960px)': {
                  flexDirection: 'row',
                },
              }}
            >
              {/*  Verifica se está editando */}
              {editing ? (
                <IconButton onClick={handleSave}>
                  <Save />
                </IconButton>
              ) : (
                <IconButton onClick={handleEdit}>
                  <Edit />
                </IconButton>
              )}

              {/* Botão de deletar */}
              <IconButton onClick={() => onDelete(id)}>
                <Delete />
              </IconButton>
            </Box>
            
          </Box>

        </CardContent>

      </Card>
    </>
  );
};

export default TaskCard;