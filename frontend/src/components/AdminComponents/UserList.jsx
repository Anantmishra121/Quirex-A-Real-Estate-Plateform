import React, { useEffect, useState } from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios';
import Swal from 'sweetalert2';

// Admin user management component - displays all registered users
const UserList = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetchData();
  }, [])

  // Fetch all registered users from backend
  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/admin-user-list');
    if (response?.data?.code == 200) {
      setData(response?.data?.data)
    }
  } 

  return (
    <>
      <NavBar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className='text-center mb-4' style={{ color: '#ff4d4d', fontWeight: 'bold' }}>
              User List
            </h1>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-11 col-md-12">
            {/* Display users in table format */}
            {data?.length > 0 ? (
              <div className="table-responsive shadow-sm rounded">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center" style={{ minWidth: '60px' }}>Sr No.</th>
                      <th scope="col" style={{ minWidth: '150px' }}>Full Name</th>
                      <th scope="col" style={{ minWidth: '200px' }}>Email Address</th>
                      <th scope="col" style={{ minWidth: '130px' }}>Contact Number</th>
                      <th scope="col" style={{ minWidth: '200px' }}>Address</th>
                      <th scope="col" className="text-center" style={{ minWidth: '120px' }}>Profile Photo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr key={item?._id || index} className="align-middle">
                        <th scope="row" className="text-center fw-bold text-primary">{index + 1}</th>
                        <td className="fw-semibold">{item?.name}</td>
                        <td className="text-muted">{item?.email}</td>
                        <td className="fw-medium">{item?.contact}</td>
                        <td style={{maxWidth: '200px', wordWrap: 'break-word'}}>
                          {item?.address}
                        </td>
                        <td className="text-center">
                          <img 
                            height="60" 
                            width="100" 
                            src={`http://localhost:9000/img/${item?.profile}`}
                            className="rounded-circle border shadow-sm"
                            alt="user profile"
                            style={{
                              objectFit: 'cover',
                              width: '50px',
                              height: '50px'
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5">
                <div className="text-muted mb-3">
                  <i className="fas fa-users fa-4x"></i>
                </div>
                <h4 className="text-muted">No Users Found</h4>
                <p className="text-secondary">No registered users available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserList
