interface TaskProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    onEdit: (id: number, newTitle: string, newDescription: string) => void;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

interface ListProps {
    tasks: {
        id: number;
        title: string;
        description: string;
        completed: boolean
    }[];
    onEdit: (id: number, newTitle: string, newDescription: string) => void;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

export { TaskProps, ListProps };