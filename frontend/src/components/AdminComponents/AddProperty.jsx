import React from 'react'
import NavBar from '../landingComponents/NavBar';
import { FaHome, FaRupeeSign, FaMapMarkerAlt, FaFileAlt, FaImage } from "react-icons/fa";
import { MdSquareFoot } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

// Form validation schema for property addition
const schemaproperty = yup
  .object()
  .shape({
    title: yup.string().required().min(2).max(50),
    price: yup.string().required(),
    area: yup.string().required().min(2).max(20),
    location: yup.string().required().min(2).max(100),
    description: yup.string().required().min(2).max(500),
    pic: yup.mixed()
  })

// Admin property addition component - allows admin to add new properties to the system
const AddProperty = () => {
  const { register, handleSubmit,reset, formState: { errors } } = useForm({
    resolver: yupResolver(schemaproperty),
  });

  // Handle property addition with image upload
  const addProperty = async (data) => {
    const formData = new FormData();
    formData.append('title', data?.title);
    formData.append('price', data?.price);
    formData.append('area', data?.area);
    formData.append('location', data?.location);
    formData.append('description', data?.description);
    formData.append('pic', data?.pic[0]);
    
    const response = await axios.post('http://localhost:9000/api/add-property', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Add Property",
        text: response?.data?.message,
        icon: "success"
      })
      reset() // Clear form after successful submission
    } else {
      Swal.fire({
        title: "Add Property",
        text: response?.data?.message,
        icon: "error"
      })
    }
  }
  return (
    <>
      <NavBar />
      <div className="container my-3">
        <div className="row justify-content-center">
          {/* Page header */}
          <div className="col-12 text-center mb-1">
            <h2 className="fw-bold" style={{ color: '#ff4d4d', fontSize: '2rem' }}>Add New Property</h2>
            <p className="text-muted">Fill in the details to add a new property to your listing</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="form-box">
              {/* Property addition form */}
              <form onSubmit={handleSubmit((d) => addProperty(d))} >
                <div className="row g-4">

                  {/* Property title input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Property Title</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaHome className="text-primary" /></span>
                      <input {...register('title')} type="text" className="form-control border-start-0 ps-2" placeholder="Enter property title" />
                    </div>
                    {errors?.title && <p className='text-danger small mt-1'>{errors?.title?.message}</p>}
                  </div>

                  {/* Price input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Price</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaRupeeSign className="text-primary" /></span>
                      <input {...register('price')} type="text" className="form-control border-start-0 ps-2" placeholder="Enter price (₹)" />
                    </div>
                    {errors?.price && <p className='text-danger small mt-1'>{errors?.price?.message}</p>}
                  </div>

                  {/* Area input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Area</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><MdSquareFoot className="text-primary" /></span>
                      <input {...register('area')} type="text" className="form-control border-start-0 ps-2" placeholder="Enter area (sq ft)" />
                    </div>
                    {errors?.area && <p className='text-danger small mt-1'>{errors?.area?.message}</p>}
                  </div>

                  {/* Location input */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">Location</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaMapMarkerAlt className="text-primary" /></span>
                      <input {...register('location')} type="text" className="form-control border-start-0 ps-2" placeholder="Enter location" />
                    </div>
                    {errors?.location && <p className='text-danger small mt-1'>{errors?.location?.message}</p>}
                  </div>

                  {/* Property description */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">Description</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaFileAlt className="text-primary" /></span>
                      <textarea {...register('description')} className="form-control border-start-0 ps-2" rows="3" placeholder="Enter property description"></textarea>
                    </div>
                    {errors?.description && <p className='text-danger small mt-1'>{errors?.description?.message}</p>}
                  </div>

                  {/* Property image upload */}
                  <div className="col-12">
                    <label className="form-label fw-semibold text-secondary">Property Image</label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0"><FaImage className="text-primary" /></span>
                      <input {...register('pic')} type="file" className="form-control border-start-0 ps-2" accept="image/*" />
                    </div>
                    {errors?.pic && <p className='text-danger small mt-1'>{errors?.pic?.message}</p>}
                  </div>

                  {/* Submit button */}
                  <div className="text-center mt-5">
                    <input type="submit" className="btn px-5 btn-login" value="Add Property" />
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

export default AddProperty
