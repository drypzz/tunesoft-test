export interface Task {
   id: number;
   title: string;
   assignedTo: string;
   state: string;
   description: string;
}

export interface ICardBacklogComponentsProps {
   order: number;
   id: number;
   title: string;
   createdBy: string;
   state: string;
   tags?: string[];
   tasks?: Task[];
}

