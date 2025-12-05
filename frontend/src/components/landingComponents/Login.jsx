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
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(20),
  })

// Login component - handles user authentication
const Login = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle user login and redirect based on user type
  const handleLogin = async (data) => {
    const response = await axios.post('http://localhost:9000/api/login', data)
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "success"
      });
      localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));
      if (response?.data?.data?.userType == "admin") {
        navigate('/')
      } else if (response?.data?.data?.userType == "user") {
        navigate('/')
      }
    } else {
      Swal.fire({
        title: "Login",
        text: response?.data?.message,
        icon: "error"
      });
    }
  }
  return (
    <>
      <NavBar/>
      <div className="container my-5">
        <div className="row justify-content-center">
          {/* Login page header */}
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#ff4d4d', fontSize: '2.5rem' }}>Login Here</h2>
            <p className="text-muted">Welcome back! Please sign in to your account</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-box">
              {/* Login form */}
              <form onSubmit={handleSubmit((d) => handleLogin(d))}>
                {/* Email input */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">Your Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-primary" /></span>
                    <input type="email" {...register('email')} className="form-control border-start-0 ps-2" placeholder="Enter your email" />
                  </div>
                  {errors?.email && <p className='text-danger small mt-1'>{errors?.email?.message}</p>}
                </div>
                {/* Password input */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0"><FaKey className="text-primary" /></span>
                    <input type="password" {...register('password')} className="form-control border-start-0 ps-2" placeholder="Password" />
                  </div>
                  {errors?.password && <p className='text-danger small mt-1'>{errors?.password?.message}</p>}
                </div>
                {/* Submit button */}
                <div className="text-center mt-5">
                  <input type="submit" className="btn px-5 btn-login" value="Sign In" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
