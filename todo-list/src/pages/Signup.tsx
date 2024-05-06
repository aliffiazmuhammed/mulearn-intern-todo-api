import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { registerRoute } from '../utils/APIRoutes';

interface FormValues {
    username: string;
    first_name: string;
    last_name:string;
    password: string;
}

function Signup() {
    const navigate = useNavigate();
    const [values, setValues] = useState<FormValues>({
        username: "",
        first_name:"",
        last_name:"",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (values.username && values.password && values.first_name && values.last_name) {
            if (!localStorage.getItem(values.username)) {
                const { username,first_name,last_name, password } = values;
                const {data} = await axios.post(registerRoute,{
                    username,
                    password,
                    first_name,
                    last_name,
                    
                })
                console.log(data)
                if(data.code == 201){
                    navigate('/mulearn-intern-todo-api/signin')
                }
                
            } else {
                alert('User already registered');
            }
        } else {
            alert('Incomplete');
        }
    };

    return (
        <div className='container'>
            <form className="new-item-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        onChange={handleChange}
                    />
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="username"
                        name="first_name"
                        onChange={handleChange}
                    />
                    <label htmlFor="username">Last Name</label>
                    <input
                        type="text"
                        id="username"
                        name="last_name"
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <button className="btn" type="submit">Sign up</button>
                <span>Already have an account?<Link to="/mulearn-intern-todo-api/signin"> SIGN IN</Link></span>
            </form>
        </div>
    );
}

export default Signup;

