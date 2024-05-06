import { useEffect, useState } from 'react';
import { NewTodoForm } from '../components/NewTodoForm';
import axios from 'axios';
import { createRoute, completedRoute, notCompletedRoute, expiredRoute , deletetask,marktask ,logouttask} from '../utils/APIRoutes'; // assuming you have these routes defined
import { useNavigate } from 'react-router-dom';

interface Todo {
    id: string;
    title: string;
    is_completed: boolean;
}

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem('loggedInUser');
    const auth = localStorage.getItem('auth');

    useEffect(() => {
        if (!username) {
            navigate('/mulearn-intern-todo-api/signin');
        }
    }, [navigate, username]);

    const [displayedTasks, setDisplayedTasks] = useState<Todo[]>([]);

    useEffect(() => {
        fetchTasks(completedRoute); // Fetch completed tasks by default when component mounts
    }, []);

    const fetchTasks = async (route: string) => {
        try {
            const { data } = await axios.get<Todo[]>(route, {
                headers: {
                    Authorization: auth,
                },
            });
            setDisplayedTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleComplete = () => {
        fetchTasks(completedRoute);
    };

    const handleNotComplete = () => {
        fetchTasks(notCompletedRoute);
    };

    const handleExpired = () => {
        fetchTasks(expiredRoute);
    };

    const handleToggleComplete = async (id: string, isCompleted: boolean) => {
        try {
            const { data } = await axios.post<Todo>(marktask, {
                id
            }, {
                headers: {
                    Authorization: auth,
                },
            });
            console.log(data)
            const updatedTasks = displayedTasks.map(task =>
                task.id === id ? { ...task, is_completed: !isCompleted } : task
            );
            setDisplayedTasks(updatedTasks);
        } catch (error) {
            console.error(error);
        }
    };

    const addTodo = async (title: string, expiry: string) => {
        try {
            const { data } = await axios.post<Todo>(createRoute, {
                title,
                expiry
            }, {
                headers: {
                    Authorization: auth,
                },
            });
            console.log(data);
            setDisplayedTasks([...displayedTasks, data]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
           const {data} = await axios.delete(deletetask+`${id}`, {
                headers: {
                    Authorization: auth,
                },
            });
            console.log(data)
            setDisplayedTasks(displayedTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            const { data } = await axios.post(
                logouttask,
                {}, // Empty object for data
                {
                    headers: {
                        Authorization: auth,
                    },
                }
            );
            console.log(data);
            localStorage.removeItem('auth');
            localStorage.removeItem('loggedInUser');
            navigate('/mulearn-intern-todo-api/signin');
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <>
            <button onClick={handleLogout} className='btn'>Logout</button>
            <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
            <button className='btn' onClick={handleComplete}>Completed Todos</button>
            <button className='btn' onClick={handleNotComplete}>Not Completed Todos</button>
            <button className='btn' onClick={handleExpired}>Expired Todos</button>
            <ul>
            {displayedTasks.map(todo => {
    console.log(todo); // Add console.log here
    return (
        <li key={todo.id}>
            <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => handleToggleComplete(todo.id, todo.is_completed)}
            />
            {todo.title}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
    );
})}
            </ul>
        </>
    );
}

export default Home;




