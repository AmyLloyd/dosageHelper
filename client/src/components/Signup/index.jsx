import { useState } from 'react';
import { useMutation } from '@apollo/client';
import './styles.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SIGNUP } from '../../utils/mutations';
import Auth from '../../utils/auth';

function SignupForm(props) {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [signup, { error }] = useMutation(SIGNUP);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState, "formState");
        try {
            const { data } = await signup({
              variables: { ...formState },
            });
      
            Auth.login(data.signUpVet.token);
          } catch (e) {
            console.error(e);
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
                    <h1>Sign Up!</h1>
                    <div className="input-box">
                        <input type="username"
                        placeholder='Username'
                        name="username"
                        id="username"
                        onChange={handleChange}
                        required />
                        <FaUser className='icon' />
                    </div>
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

                    <button type="submit">Sign Up</button>

                    <div className="register-link">
                        <p>Already have an account? <a href="#">
                        <Link to="/LoginForm">LOGIN</Link>
                        </a></p>
                    </div>
                    
                </form>
            </div>
    );
}

export default SignupForm;