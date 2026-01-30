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
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone is required').min(10, 'Phone must be at least 10 digits'),
  subject: yup.string().required('Subject is required').min(2, 'Subject must be at least 2 characters'),
  message: yup.string().required('Message is required').min(2, 'Message must be at least 2 characters')
});

// Contact Us page component - handles user inquiries and feedback
const ContactUs = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schemacontact),
  });

  // Submit contact form to backend API
  const contactUser = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:9000/api/contact-us', data);
      if (response?.data?.code === 200) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
          timer: 2000
        });
        reset();
        setTimeout(() => navigate('/'), 2000);
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
        text: error?.response?.data?.message || "Failed to send message. Please try again.",
        icon: "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="contact-wrapper">
        <div className="contact-container">
          <div className="contact-card">
            {/* Contact header */}
            <div className="contact-header">
              <h1 className="contact-title">Get in Touch</h1>
              <p className="contact-subtitle">We'd love to hear from you. Send us a message!</p>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit((d) => contactUser(d))} className="contact-form">
              {/* Name & Email Row */}
              <div className="form-row">
                <div className="form-col">
                  <div className="floating-input-wrapper">
                    <FaUser className="input-icon" />
                    <input
                      id="name"
                      type="text"
                      className={`form-input ${errors?.name ? 'error' : ''}`}
                      placeholder="Full Name"
                      {...register('name')}
                    />
                  </div>
                  {errors?.name && <p className='error-message'>{errors?.name?.message}</p>}
                </div>

                <div className="form-col">
                  <div className="floating-input-wrapper">
                    <FaEnvelope className="input-icon" />
                    <input
                      id="email"
                      type="email"
                      className={`form-input ${errors?.email ? 'error' : ''}`}
                      placeholder="Email Address"
                      {...register('email')}
                    />
                  </div>
                  {errors?.email && <p className='error-message'>{errors?.email?.message}</p>}
                </div>
              </div>

              {/* Phone & Subject Row */}
              <div className="form-row">
                <div className="form-col">
                  <div className="floating-input-wrapper">
                    <IoMdCall className="input-icon" />
                    <input
                      id="phone"
                      type="tel"
                      className={`form-input ${errors?.phone ? 'error' : ''}`}
                      placeholder="Phone Number"
                      {...register('phone')}
                    />
                  </div>
                  {errors?.phone && <p className='error-message'>{errors?.phone?.message}</p>}
                </div>

                <div className="form-col">
                  <div className="floating-input-wrapper">
                    <MdSubtitles className="input-icon" />
                    <input
                      id="subject"
                      type="text"
                      className={`form-input ${errors?.subject ? 'error' : ''}`}
                      placeholder="Subject"
                      {...register('subject')}
                    />
                  </div>
                  {errors?.subject && <p className='error-message'>{errors?.subject?.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div className="form-full">
                <textarea
                  id="message"
                  rows="4"
                  className={`form-textarea ${errors?.message ? 'error' : ''}`}
                  placeholder="Write your message here..."
                  {...register('message')}
                />
                {errors?.message && <p className='error-message'>{errors?.message?.message}</p>}
              </div>

              {/* Submit button */}
              <button type="submit" className="btn-contact" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;