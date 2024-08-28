import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField, Checkbox, Box } from '@mui/material';
import { Edit, Delete, Save } from '@mui/icons-material';

import { TaskProps } from '../utils/Tasks.props.ts';
import TasksInputsProps from '../utils/Input.props.ts';

const Task = ({ id, title, description, completed, onEdit, onComplete, onDelete }: TaskProps) => {

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
    }else{
      alert('Please enter a task title and description');
    }
    setEditing(false);
  };

  return (
    <ListItem>
      <Checkbox checked={completed} onChange={() => onComplete(id)} />
      {editing ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 2 }}>
          <TextField
            value={editInputs.title}
            onChange={(e) => setEditInputs({ ...editInputs, title: e.target.value })}
            autoFocus
            fullWidth
          />
          <TextField
            value={editInputs.description}
            onChange={(e) => setEditInputs({ ...editInputs, description: e.target.value })}
            multiline
            fullWidth
          />
        </Box>
      ) : (
        <>
          <ListItemText style={{color: '#fff'}} primary={title} />
          <ListItemText style={{color: '#fff'}} primary={description} />
        </>
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
    </ListItem>
  );
};

export default Task;
