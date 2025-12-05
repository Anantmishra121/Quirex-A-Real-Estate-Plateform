import React from 'react';
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from './NavBar';

// Form validation schema for user registration
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  password: yup.string().required().min(8).max(20),
  address: yup.string().required(),
  profile: yup.mixed().required()
});

// User registration component - handles new user account creation
const UserRegister = () => {

  const { register, handleSubmit, formState: { errors }, reset
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle user registration with file upload
  const handleRegister = async (data) => {
    try {
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
          icon: "success"
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        title: "Registration Failed",
        text: response?.data?.message,
        icon: "error"

      });
    }
  };
  return (
    <>
      <NavBar />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#ff4d4d', fontSize: '2.5rem' }}>Register Here</h2>
            <p className="text-muted">Create your account to get started</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="form-box">
              <form onSubmit={handleSubmit(handleRegister)}>
                <div className="row g-4">

                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaUser className="text-primary" /></span>
                      <input type="text" {...register('name')} className="form-control border-start-0 ps-2" placeholder="Enter your name" />
                    </div>
                    {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                  </div>


                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-primary" /></span>
                      <input type="email" {...register('email')} className="form-control border-start-0 ps-2" placeholder="Enter your email" />
                    </div>
                    {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                  </div>


                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><IoMdCall className="text-primary" /></span>
                      <input type="tel" {...register('contact')} className="form-control border-start-0 ps-2" placeholder="Enter phone number" />
                    </div>
                    {errors.contact && <p className="text-danger small mt-1">{errors.contact.message}</p>}
                  </div>


                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaKey className="text-primary" /></span>
                      <input type="password" {...register('password')} className="form-control border-start-0 ps-2" placeholder="Password" />
                    </div>
                    {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
                  </div>



                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaKey className="text-primary" /></span>
                      <input type="text" {...register('address')} className="form-control border-start-0 ps-2" placeholder="Enter Your Address" />
                    </div>
                    {errors.address && <p className="text-danger small mt-1">{errors.address.message}</p>}
                  </div>


                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Profile Picture</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><MdAddPhotoAlternate className="text-primary" /></span>
                      <input type="file" {...register('profile')} className="form-control border-start-0 ps-2" />
                    </div>
                    {errors.profile && <p className="text-danger small mt-1">{errors.profile.message}</p>}
                  </div>


                  <div className="text-center mt-5">
                    <input type="submit" className="btn px-5 btn-login" value="Create Account" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegister;