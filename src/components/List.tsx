import React from "react";

import Task from "./Task.tsx";

import { ListProps } from "../utils/Tasks.props.ts";

const ListTasks = ({ tasks, onEdit, onComplete, onDelete }: ListProps) => {
    return (
      <>
        {tasks.map(task => (
          <Task
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
  
  export default ListTasks;