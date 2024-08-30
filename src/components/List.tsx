import React from 'react';

// Componente TaskCard
import TaskCard from './Card.tsx';

// Props do componente Task
import { ListProps } from '../utils/Tasks.props.ts';

// Componente Task
const ListTask = ({ tasks, onEdit, onComplete, onDelete }: ListProps) => {
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
  
export default ListTask;