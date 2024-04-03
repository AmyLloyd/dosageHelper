import { useState } from 'react';
import { useMutation } from '@apollo/client';
import './styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

function LoginForm(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            console.log(mutationResponse, "mutationResponse");
            const token = mutationResponse.data.loginVet.token;
            Auth.login(token);

            
            console.log("You are now logged in.");
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (

            <div className='wrapper'>
                <form action="" onSubmit={handleFormSubmit}>
                    <h1>Welcome Back!</h1>
                    <div className="input-box">
                        <input type="email"
                        placeholder='Email address'
                        name="email"
                        id="email"
                        onChange={handleChange}
                        required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password"
                        placeholder='Password'
                        name="password"
                        id="pwd"
                        onChange={handleChange}
                        required />
                        <FaLock className='icon' />
                    </div>

                    {error ? (
                        <div>
                            <p className="error-text">Please check your email and password and try again.</p>
                        </div>
                    ) : null}

                    <button type="submit">Log in</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href="#">
                        <Link to="/signup">Sign up</Link>
                        </a></p>
                    </div>
                    
                </form>
            </div>
    );
}


export default LoginForm;