import React from 'react';

// Componente TaskCard
import TaskCard from './List.tsx';

// Props do componente Task
import { ListProps } from '../utils/Tasks.props.ts';

// Componente Task
const Task = ({ tasks, onEdit, onComplete, onDelete }: ListProps) => {
  return (
    <>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onEdit={onEdit}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
  
export default Task;