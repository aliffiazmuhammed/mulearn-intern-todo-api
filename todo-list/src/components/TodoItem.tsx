import React from 'react';

interface TodoItemProps {
    id: string;
    title: string;
    completed: boolean;
    expiryDate: string; // Add expiryDate to TodoItemProps
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

export function TodoItem({ completed, id, title, expiryDate, toggleTodo, deleteTodo }: TodoItemProps) {
    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        toggleTodo(id, e.target.checked);
    };

    const handleDelete = () => {
        deleteTodo(id);
    };

    return (
        <li>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={handleToggle}
                />
                {title} - Expiry Date: {expiryDate} {/* Display expiryDate */}
            </label>
            <button onClick={handleDelete} className="btn btn-danger">
                Delete
            </button>
        </li>
    );
}

