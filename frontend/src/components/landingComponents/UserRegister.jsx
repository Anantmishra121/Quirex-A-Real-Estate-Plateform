import React from 'react';
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

// Form validation schema for user registration
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  contact: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  address: yup.string().required('Address is required'),
  profile: yup.mixed().required('Profile picture is required')
});

// User registration component - handles new user account creation
const UserRegister = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle user registration with file upload
  const handleRegister = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('contact', data.contact);
      formData.append('password', data.password);
      formData.append('address', data.address);
      formData.append('profile', data.profile[0]);

      const response = await axios.post('http://localhost:9000/api/user-register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        reset(); // Reset the form
        Swal.fire({
          title: "Success!",
          text: "User registered successfully",
          icon: "success",
          timer: 2000
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        title: "Registration Failed",
        text: error?.response?.data?.message || "Registration failed. Please try again.",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className="register-wrapper">
        <div className="register-container">
          <div className="register-card">
            {/* Register header */}
            <div className="register-header">
              <h1 className="register-title">Create Account</h1>
              <p className="register-subtitle">Join us today and get started</p>
            </div>

            {/* Registration form */}
            <form onSubmit={handleSubmit(handleRegister)} className="register-form">
              <div className="form-grid">
                {/* Name input */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="input-wrapper">
                    <FaUser className="input-icon" />
                    <input 
                      id="name"
                      type="text" 
                      {...register('name')} 
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Enter your name" 
                    />
                  </div>
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>

                {/* Email input */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <div className="input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input 
                      id="email"
                      type="email" 
                      {...register('email')} 
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="your@email.com" 
                    />
                  </div>
                  {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>

                {/* Phone input */}
                <div className="form-group">
                  <label htmlFor="contact" className="form-label">Phone Number</label>
                  <div className="input-wrapper">
                    <IoMdCall className="input-icon" />
                    <input 
                      id="contact"
                      type="tel" 
                      {...register('contact')} 
                      className={`form-input ${errors.contact ? 'error' : ''}`}
                      placeholder="Enter phone number" 
                    />
                  </div>
                  {errors.contact && <p className="error-message">{errors.contact.message}</p>}
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
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="••••••••" 
                    />
                  </div>
                  {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                {/* Address input */}
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <div className="input-wrapper">
                    <FaMapMarkerAlt className="input-icon" />
                    <input 
                      id="address"
                      type="text" 
                      {...register('address')} 
                      className={`form-input ${errors.address ? 'error' : ''}`}
                      placeholder="Enter your address" 
                    />
                  </div>
                  {errors.address && <p className="error-message">{errors.address.message}</p>}
                </div>

                {/* Profile Picture input */}
                <div className="form-group">
                  <label htmlFor="profile" className="form-label">Profile Picture</label>
                  <div className="input-wrapper file-input">
                    <MdAddPhotoAlternate className="input-icon" />
                    <input 
                      id="profile"
                      type="file" 
                      {...register('profile')} 
                      className={`form-input ${errors.profile ? 'error' : ''}`}
                    />
                  </div>
                  {errors.profile && <p className="error-message">{errors.profile.message}</p>}
                </div>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn-register" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;