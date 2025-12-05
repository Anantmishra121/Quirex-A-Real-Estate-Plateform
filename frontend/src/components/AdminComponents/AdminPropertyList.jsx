import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import NavBar from '../landingComponents/NavBar'
import axios from 'axios';
import Swal from 'sweetalert2';

// Admin property listing component - manages all properties with delete functionality
const AdminPropertyList = () => {
  const [listData, setListData] = useState([])
  
  useEffect(() => {
    fetchData()
  }, [])

  // Fetch all properties from backend
  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/property-list');
    if (response?.data?.code == 200) {
      setListData(response?.data?.data)
    }
  }

  // Handle property deletion with confirmation
  const handleDeleteProperty = async (_id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post('http://localhost:9000/api/delete-property', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "Delete Property.",
            text: response?.data?.message,
            icon: "success",
          })
          fetchData(); // Refresh the list after deletion
        }else{
          Swal.fire({
            title: "Delete Property.",
            text: response?.data?.message,
            icon: "error",
          })
        }
      }
    });
  }
  
  // Split the data into chunks of 4 for better display
  const chunkedList = [];
  for (let i = 0; i < listData.length; i += 4) {
    chunkedList.push(listData.slice(i, i + 4));
  }

  return (
    <>
      <NavBar />
      <div className='container-fluid property-section py-5'>
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">Featured Listings</h2>
        </div>

        {chunkedList.length > 0 ? (
          chunkedList.map((group, groupIndex) => (
            <div className='row justify-content-center px-3 mb-4' key={groupIndex}>
              {group.map((item, index) => (
                <div className='col-12 col-sm-6 col-md-3 mb-4' key={item?._id || index}>
                  <div className="card h-100 border-0 rounded-4 overflow-hidden property-card position-relative" 
                       data-aos="zoom-in" 
                       data-aos-duration="800"
                       style={{
                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                         background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                         cursor: 'pointer'
                       }}>
                    
                    {/* Price Badge */}
                    <div className="position-absolute top-0 start-0 m-3 z-3">
                      <span className="badge rounded-pill px-3 py-2 fw-bold"
                            style={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              fontSize: '0.85rem',
                              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                            }}>
                        ${item?.price}/Month
                      </span>
                    </div>

                    {/* Image Container */}
                    <div className="position-relative overflow-hidden rounded-top-4">
                      <img
                        src={`http://localhost:9000/img/${item?.pic}`}
                        className="card-img-top w-100 property-image"
                        alt="property"
                        style={{ 
                          height: '240px',
                          objectFit: 'cover'
                        }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100"
                           style={{
                             background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)'
                           }}>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="card-title fw-bold mb-2" 
                          style={{ 
                            color: '#2c3e50',
                            fontSize: '1.25rem',
                            lineHeight: '1.3'
                          }}>
                        {item?.title}
                      </h5>
                      
                      <p className="card-text mb-4" 
                         style={{ 
                           color: '#6c757d',
                           fontSize: '0.95rem',
                           lineHeight: '1.5',
                           display: '-webkit-box',
                           WebkitLineClamp: 2,
                           WebkitBoxOrient: 'vertical',
                           overflow: 'hidden'
                         }}>
                        {item?.description}
                      </p>

                      {/* Footer Section */}
                      <div className='d-flex justify-content-end align-items-center mt-auto pt-3'
                           style={{ borderTop: '1px solid #e9ecef' }}>

                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDeleteProperty(item?._id)} 
                          className='btn btn-sm rounded-pill px-4 py-2 fw-semibold property-btn-danger'
                          style={{
                            background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                            border: 'none',
                            color: 'white',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 15px rgba(220,53,69,0.3)'
                          }}>
                          <FaTrashAlt className="me-2" style={{ fontSize: '0.8rem' }} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h4 className='text-muted'>No Record Found</h4>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminPropertyList
