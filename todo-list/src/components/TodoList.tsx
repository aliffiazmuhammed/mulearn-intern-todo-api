
import { TodoItem } from './TodoItem';
import '../App.css';

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    expiryDate: string; // Add expiryDate to Todo interface
}

interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
    return (
        <ul className="list">
            {todos.length === 0 && <li>No Todos</li>}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    completed={todo.completed}
                    expiryDate={todo.expiryDate} // Pass expiryDate to TodoItem
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}
