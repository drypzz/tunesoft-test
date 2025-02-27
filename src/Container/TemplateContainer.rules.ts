import { useEffect, useState } from 'react';

import { ITemplateContainerProps } from './TemplateContainer.types';

// Axios
import axios from 'axios';
const API_URL = 'http://localhost:5000/tasks'; // URL da API

export const useTemplateContainerRules = () => {
   const [loading, setLoading] = useState<boolean>(false); // Estado de carregamento

   const [tasks, setTasks] = useState<{ 
     id: number;
     title: string;
     description: string;
     status: string
   }[]>([]); // Estado das tarefas
 
   const [newTask, setNewTask] = useState<ITemplateContainerProps>({
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

   return {
      loading,
      tasks,
      newTask,
      setNewTask,
      addTask,
      editTask,
      toggleTaskStatus,
      deleteTask
   }
}