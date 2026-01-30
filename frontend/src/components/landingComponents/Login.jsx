import React from 'react'
import { FaEnvelope } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';

// Form validation schema for login
const schema = yup
  .object()
  .shape({
    email: yup.string().required('Email is required').email('Please enter a valid email'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  })

// Login component - handles user authentication
const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle user login and redirect based on user type
  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:9000/api/login', data)
      if (response?.data?.code == 200) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
          timer: 2000
        });
        localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));
        if (response?.data?.data?.userType == "admin") {
          navigate('/')
        } else if (response?.data?.data?.userType == "user") {
          navigate('/')
        }
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message,
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Login failed. Please try again.",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <NavBar/>
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-card">
            {/* Login header */}
            <div className="login-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit((d) => handleLogin(d))} className="login-form">
              {/* Email input */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input 
                    id="email"
                    type="email" 
                    {...register('email')} 
                    className={`form-input ${errors?.email ? 'error' : ''}`}
                    placeholder="your@email.com" 
                  />
                </div>
                {errors?.email && <p className='error-message'>{errors?.email?.message}</p>}
              </div>

              {/* Password input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-wrapper">
                  <FaKey className="input-icon" />
                  <input 
                    id="password"
                    type="password" 
                    {...register('password')} 
                    className={`form-input ${errors?.password ? 'error' : ''}`}
                    placeholder="••••••••" 
                  />
                </div>
                {errors?.password && <p className='error-message'>{errors?.password?.message}</p>}
              </div>

              {/* Submit button */}
              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
