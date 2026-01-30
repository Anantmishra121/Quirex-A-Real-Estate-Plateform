import React, { useEffect, useState } from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt } from "react-icons/fa";

// Admin sold properties component - manages and displays all sold/purchased properties
const AdminSoldProperty = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetchData();
  }, [])

  // Fetch all sold properties from backend
  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/admin-sold-list');
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  } 

  // Handle sold property record deletion with confirmation
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
        const response = await axios.post('http://localhost:9000/api/delete-sold-item', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "Delete Property.",
            text: response?.data?.message,
            icon: "success",
          })
          fetchData(); // Refresh list after deletion
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

  return (
    <>
      <NavBar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className='text-center mb-4' style={{ color: '#ff4d4d', fontWeight: 'bold' }}>
              Sold Properties List
            </h1>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-11 col-md-12">
            {data?.length > 0 ? (
              <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center" style={{ minWidth: '60px' }}>Sr No.</th>
                      <th scope="col" style={{ minWidth: '120px' }}>Buyer Name</th>
                      <th scope="col" style={{ minWidth: '180px' }}>Email</th>
                      <th scope="col" style={{ minWidth: '120px' }}>Contact</th>
                      <th scope="col" style={{ minWidth: '150px' }}>Property Title</th>
                      <th scope="col" className="text-center" style={{ minWidth: '100px' }}>Price</th>
                      <th scope="col" className="text-center" style={{ minWidth: '80px' }}>Area</th>
                      <th scope="col" style={{ minWidth: '120px' }}>Location</th>
                      <th scope="col" className="text-center" style={{ minWidth: '120px' }}>Property Image</th>
                      <th scope="col" className="text-center" style={{ minWidth: '100px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr key={item?._id || index} className="align-middle">
                        <th scope="row" className="text-center fw-bold text-primary">{index + 1}</th>
                        <td className="fw-semibold">{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.contact}</td>
                        <td className="fw-semibold">{item?.title}</td>
                        <td className="text-center text-success fw-bold">${item?.price}/month</td>
                        <td className="text-center">{item?.area}</td>
                        <td>{item?.location}</td>
                        <td className="text-center">
                          <img 
                            height="60" 
                            width="100" 
                            src={`http://localhost:9000/img/${item?.pic}`}
                            className="rounded border shadow-sm"
                            alt="property"
                            style={{objectFit: 'cover'}}
                          />
                        </td>
                        <td className="text-center">
                          <button 
                            onClick={() => handleDeleteProperty(item?._id)} 
                            className='btn btn-outline-danger btn-sm rounded-pill px-3'
                            style={{
                              transition: 'all 0.3s ease',
                              border: '2px solid #dc3545'
                            }}
                          >
                            <FaTrashAlt className="me-1" style={{ fontSize: '0.8rem' }} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3">
                  <i className="fas fa-clipboard-list fa-4x"></i>
                </div>
                <h4 className="text-muted">No Sold Properties Found</h4>
                <p className="text-secondary">No properties have been sold yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSoldProperty
