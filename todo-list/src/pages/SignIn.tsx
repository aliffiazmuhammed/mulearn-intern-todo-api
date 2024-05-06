import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

interface FormValues {
    username: string;
    password: string;
}

function SignIn() {
    const navigate = useNavigate();
    const [values, setValues] = useState<FormValues>({
        username: "",
        password: "",
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>)=> {

        event.preventDefault();
        if (values.username && values.password) {
            const {username,password} = values
            const {data} = await axios.post(loginRoute,{
                username,
                password,
                
            })
            console.log(data)
            if(data.code == 200){
                localStorage.setItem('loggedInUser',values.username);
                localStorage.setItem('auth',data.access_token);
                navigate('/mulearn-intern-todo/')
            }else{
                alert("inavalid login")
            }
        } else {
            alert('Fill complete form');
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
                        value={values.username}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn" type="submit">Sign in</button>
                <span>Don't have an account?<Link to="/mulearn-intern-todo/signup"> REGISTER</Link></span>
            </form>
        </div>
    );
}

export default SignIn;

