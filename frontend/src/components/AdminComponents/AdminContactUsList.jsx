import React, { useEffect, useState } from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios'
import Swal from 'sweetalert2';

// Admin contact queries management component - displays all customer inquiries
const AdminContactUsList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  // Fetch all contact form submissions from customers
  const fetchData = async () => {
    const response = await axios.post('http://localhost:9000/api/contact-us-list');
    if (response?.data?.code == 200) {
      setList(response?.data?.data)
    }
  };

  // Display full message in a modal popup
  const show = (data) => {
    Swal.fire({
      title: "Message",
      text: data,
      icon: "information"
    })
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className='text-center mb-4' style={{ color: '#ff4d4d', fontWeight: 'bold' }}>
              Customer Contact Queries
            </h1>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-11 col-md-12">
            {/* Display contact queries in table format */}
            {list?.length > 0 ? (
              <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center" style={{ minWidth: '60px' }}>Sr No.</th>
                      <th scope="col" style={{ minWidth: '150px' }}>Customer Name</th>
                      <th scope="col" style={{ minWidth: '200px' }}>Email Address</th>
                      <th scope="col" style={{ minWidth: '130px' }}>Phone Number</th>
                      <th scope="col" style={{ minWidth: '300px' }}>Query Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((item, index) => (
                      <tr key={index} className="align-middle">
                        <th scope="row" className="text-center fw-bold text-primary">{index + 1}</th>
                        <td className="fw-semibold">{item?.name}</td>
                        <td className="text-muted">{item?.email}</td>
                        <td className="fw-medium">{item?.phone}</td>
                        <td style={{ 
                          maxWidth: '350px', 
                          wordWrap: 'break-word', 
                          whiteSpace: 'pre-wrap',
                          lineHeight: '1.5',
                          fontSize: '0.9rem',
                          padding: '12px 8px'
                        }}>
                          <div className="text-truncate-3" title={item?.message}>
                            {item?.message}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3">
                  <i className="fas fa-envelope-open fa-4x"></i>
                </div>
                <h4 className="text-muted">No Contact Queries</h4>
                <p className="text-secondary">No customer inquiries have been received yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminContactUsList