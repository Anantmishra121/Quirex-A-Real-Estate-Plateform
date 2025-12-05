import React from 'react';
import { FaUser, FaEnvelope } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { MdSubtitles } from "react-icons/md";
import NavBar from './NavBar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Form validation rules for contact form
const schemacontact = yup.object().shape({
  name: yup.string().required().min(2).max(200),
  email: yup.string().required(),
  phone: yup.string().required().min(10),
  subject: yup.string().required().min(2).max(200),
  message: yup.string().required().min(2).max(1000)
});

// Contact Us page component - handles user inquiries and feedback
const ContactUs = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schemacontact),
  });

  // Submit contact form to backend API
  const contactUser = async (data) => {
    const response = await axios.post('http://localhost:9000/api/contact-us', data);
    if (response?.data?.code === 200) {
      Swal.fire({
        title: "Contact Us",
        text: response?.data?.message,
        icon: "success"
      });
      navigate('/');
      reset();
    } else {
      Swal.fire({
        title: "Contact Us",
        text: response?.data?.message,
        icon: "error"
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="container my-2 ">
        <div className="row justify-content-center">
          {/* Page header */}
          <div className="col-12 text-center mb-1">
            <h2 className="fw-bold" style={{ color: '#ff4d4d', fontSize: '2rem' }}>Contact Us!</h2>
            <p className="text-muted">We'd love to hear from you. Send us a message!</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="form-box">
              {/* Contact form with validation */}
              <form onSubmit={handleSubmit((d) => contactUser(d))}>
                <div className="row g-4">
                  {/* Name input field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaUser className="text-primary" /></span>
                      <input type="text" className="form-control border-start-0 ps-2" placeholder="Enter your name" {...register('name')} />
                    </div>
                    {errors?.name && <p className='text-danger small mt-1'>{errors?.name?.message}</p>}
                  </div>

                  {/* Email input field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-primary" /></span>
                      <input type="email" className="form-control border-start-0 ps-2" placeholder="Enter your email" {...register('email')} />
                    </div>
                    {errors?.email && <p className='text-danger small mt-1'>{errors?.email?.message}</p>}
                  </div>

                  {/* Phone input field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><IoMdCall className="text-primary" /></span>
                      <input type="text" className="form-control border-start-0 ps-2" placeholder="Enter phone number" {...register('phone')} />
                    </div>
                    {errors?.phone && <p className='text-danger small mt-1'>{errors?.phone?.message}</p>}
                  </div>

                  {/* Subject input field */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Subject</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><MdSubtitles className="text-primary" /></span>
                      <input type="text" className="form-control border-start-0 ps-2" placeholder="Subject" {...register('subject')} />
                    </div>
                    {errors?.subject && <p className='text-danger small mt-1'>{errors?.subject?.message}</p>}
                  </div>

                  {/* Message textarea field */}
                  <div className="col-md-12">
                    <label className="form-label fw-semibold text-secondary">Message</label>
                    <textarea   
                      rows="5"
                      className="form-control"
                      placeholder="Write your message..." 
                      {...register('message')}
                    />
                    {errors?.message && <p className='text-danger small mt-1'>{errors?.message?.message}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="text-center mt-5">
                    <input type="submit" className="btn px-5 btn-login" value="Send Message" />
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

export default ContactUs;