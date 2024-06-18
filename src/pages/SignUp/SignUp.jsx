import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import validation from './SignupValidation';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleChange = (e) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await axios.post('http://localhost:5000/signup', values);
                if (res.status === 200) {
                    localStorage.setItem("Email", values.email);
                    document.cookie = `token=${res.data.token}; path=/; max-age=${2 * 24 * 60 * 60}`;
                    toast.success("Registered Successfully")
                    navigate('/');
                }else{
                    toast.error("Try again With new Emailid and Password")
                    alert("Try again With new Emailid and Password")
                }
            } catch (error) {
                
                console.error(error);
            }
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
                        {errors.name && <p className="error">{errors.name}</p>}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your Email.."
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                        <div className="signup-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your Password.."
                                value={values.password}
                                onChange={handleChange}
                                required
                            />
                            <span className="password-toggle-icon" onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash className='password-toggle-icon' /> : <FaEye className='password-toggle-icon' />}
                            </span>
                        </div>
                        {errors.password && <p className="error">{errors.password}</p>}
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
