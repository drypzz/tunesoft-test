import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField, Checkbox, Box } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

import { TaskProps } from '../utils/Tasks.props.ts';
import TasksInputsProps from '../utils/Input.props.ts';

const TaskCard = ({ id, title, description, completed, onEdit, onComplete, onDelete }: TaskProps) => {
  const [editing, setEditing] = useState<boolean>(false);

  const [editInputs, setEditInputs] = useState<TasksInputsProps>({
    title: title,
    description: description,
  });

  const handleEdit = () => {
    if (editing) {
      onEdit(id, editInputs.title, editInputs.description);
    }
    setEditing(!editing);
  };

  const handleSave = () => {
    if (editInputs.title.trim() && editInputs.description.trim()) {
      onEdit(id, editInputs.title, editInputs.description);
    } else {
      alert('Please enter a task title and description');
    }
    setEditing(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        mb: 2,
        bgcolor: completed ? 'rgba(0, 128, 0, 0.2)' : '#333',
        color: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Checkbox checked={completed} onChange={() => onComplete(id)} />
        {editing ? (
          <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 2 }}>
            <TextField
              value={editInputs.title}
              onChange={(e) => setEditInputs({ ...editInputs, title: e.target.value })}
              autoFocus
              variant="outlined"
              label="Title"
              fullWidth
            />
            <TextField
              value={editInputs.description}
              onChange={(e) => setEditInputs({ ...editInputs, description: e.target.value })}
              multiline
              variant="outlined"
              label="Description"
              fullWidth
            />
          </Box>
        ) : (
          <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#ccc' }}>
              {description}
            </Typography>
          </Box>
        )}
        {editing ? (
          <IconButton onClick={handleSave}>
            <Save />
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
        )}
        <IconButton onClick={() => onDelete(id)}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

export default TaskCard;
