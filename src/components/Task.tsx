import React from "react";

import ListTask from "./List.tsx";

import { ListProps } from "../utils/Tasks.props.ts";

const Task = ({ tasks, onEdit, onComplete, onDelete }: ListProps) => {
    return (
      <>
        {tasks.map(task => (
          <ListTask
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            onEdit={onEdit}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </>
    );
  };
  
  export default Task;