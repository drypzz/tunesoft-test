interface TaskProps {
    id: number;
    title: string;
    description: string;
    status: string;
    onEdit: (id: number, newTitle: string, newDescription: string) => void;
    onComplete: (id: number, status: string) => void;
    onDelete: (id: number) => void;
}

interface ListProps {
    tasks: {
        id: number;
        title: string;
        description: string;
        status: string;
    }[];
    onEdit: (id: number, newTitle: string, newDescription: string) => void;
    onComplete: (id: number, status: string) => void;
    onDelete: (id: number) => void;
}

export { TaskProps, ListProps };