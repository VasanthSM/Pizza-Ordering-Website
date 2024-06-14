import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import validation from './SignupValidation';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [err, setErr] = useState();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(validation(values));
        try {
            const res = await axios.post('http://localhost:5000/signup', values);
            if (res.status === 200) {
                localStorage.setItem("Email", values.email);
                document.cookie = `token=${res.data.token}; path=/; max-age=${2 * 24 * 60 * 60}`;

                navigate('/');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="signin-head">
            <div className="Signup">
                <form onSubmit={handleSubmit} className="signup-container">
                    <div className="signup-content">
                        <h2>Sign Up</h2>
                    </div>
                    <div className="signup-input">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your Name.."
                            value={values.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email.."
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your Password.."
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="checkbox-content">
                        <input className="checkbox" type="checkbox" required />
                        <label className="Policy">
                            <p>By continuing, I agree to the use of privacy & Policy</p>
                        </label>
                    </div>
                    <div className="account">
                        <p>
                            {' '}
                            Already have an account? <Link className="Clicking" to="/login">Login here</Link>
                        </p>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </main>
    );
};

export default SignUp;
