import React, { useEffect } from 'react';
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../landingComponents/NavBar'

// Form validation schema for user profile updates
const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup.string().required(),
  password: yup.string().required().min(8).max(20),
  address: yup.string().required(),
  profile: yup.mixed().required()
});

// User profile management component - allows users to update their personal information
const UserProfile = () => {

  useEffect(() => {
    // Pre-fill form with current user data
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    setValue('name', userData?.name);
    setValue('email', userData?.email);
    setValue('contact', userData?.contact);
    setValue('password', userData?.password);
    setValue('address', userData?.address); 
  }, [])

  const { register, handleSubmit, setValue, formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle profile update with file upload validation
  const handleRegister = async (data) => { 
    if(data?.profile?.length==0){
      Swal.fire({
        title:"File Upload Error",
        text:"Please upload a valid file.",
        icon:"error"
      })
      return
    }
     const userData= JSON.parse(localStorage.getItem('userInfo'))
      const formData = new FormData(); 
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('contact', data.contact);
      formData.append('password', data.password);
      formData.append('address', data.address);
      formData.append('profile', data.profile[0]);
      formData.append('userId',userData?._id)

      const response = await axios.put('http://localhost:9000/api/user-update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data?.code  === 200) {
        Swal.fire({
          title: "Profile Update",
          text: response?.data?.message,
          icon: "success"
        }); 
        // Update local storage with new user data
        localStorage.setItem('userInfo',JSON.stringify(response?.data?.data))
      }else{
        Swal.fire({
          title: "Profile Update",
          text: response?.data?.message,
          icon: "error"
        }); 
      } 
  };

  return (
    <>
      <NavBar />
      <div className="container my-4">
        <div className="row justify-content-center">
          {/* Page header */}
          <div className="col-12 text-center mb-4">
            <h2 className="fw-bold" style={{ color: '#ff4d4d', fontSize: '2.5rem' }}>User Profile</h2>
            <p className="text-muted">Update your personal information</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="form-box">
              {/* Profile update form */}
              <form onSubmit={handleSubmit((d)=>handleRegister(d))}>
                <div className="row g-4">

                  {/* Name input field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaUser className="text-primary" /></span>
                      <input type="text" {...register('name')} className="form-control border-start-0 ps-2" placeholder="Enter your name" />
                    </div>
                    {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Email input field (disabled for security) */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-primary" /></span>
                      <input disabled type="email" {...register('email')} className="form-control border-start-0 ps-2 bg-light" placeholder="Enter your email" />
                    </div>
                    {errors.email && <p className="text-danger small mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone number input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><IoMdCall className="text-primary" /></span>
                      <input type="tel" {...register('contact')} className="form-control border-start-0 ps-2" placeholder="Enter phone number" />
                    </div>
                    {errors.contact && <p className="text-danger small mt-1">{errors.contact.message}</p>}
                  </div>

                  {/* Password input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaKey className="text-primary" /></span>
                      <input type="text" {...register('password')} className="form-control border-start-0 ps-2" placeholder="Password" />
                    </div>
                    {errors.password && <p className="text-danger small mt-1">{errors.password.message}</p>}
                  </div>

                  {/* Address input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Address</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaKey className="text-primary" /></span>
                      <input type="text" {...register('address')} className="form-control border-start-0 ps-2" placeholder="Enter Your Address" />
                    </div>
                    {errors.address && <p className="text-danger small mt-1">{errors.address.message}</p>}
                  </div>

                  {/* Profile picture upload */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Profile Picture</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><MdAddPhotoAlternate className="text-primary" /></span>
                      <input type="file" {...register('profile')} className="form-control border-start-0 ps-2" />
                    </div>
                    {errors.profile && <p className="text-danger small mt-1">{errors.profile.message}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="text-center mt-5">
                    <input type="submit" className="btn px-5 btn-login" value="Update Profile" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
