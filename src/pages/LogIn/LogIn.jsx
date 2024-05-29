import React from 'react'
import './LogIn.css'
import { Link } from 'react-router-dom'


const LogIn = () => {

  return (
    <main className='Login-Head'>
      <img src="../../assets/ai-generated-8704064_1280.jpg" alt="" />
      <div className='login'>
      <form className="login-container">
        <div className="login-content">
          <h1>Login</h1>
        </div>
        <div className='login-input'>
          <input type="email" placeholder='Enter your Email' required />
          <input type="password" placeholder='Enter your Password' required />
        </div>
        <button>Login </button>
        <div className='login-checkbox'>
          <input className='checkbox' type="checkbox" required />
          <label className='Policy' ><p>By continuing, I agree to the use of privary & Policy</p></label>
        </div>
        <div className='account'>
          <p>Create a new Account? <Link className='Clicking' to='/signup'>Click here</Link></p>
        </div>
      </form>
    </div>
    </main>
  )
}

export default LogIn