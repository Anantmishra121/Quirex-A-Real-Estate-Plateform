import React, { useEffect, useState } from 'react'
import NavBar from '../landingComponents/NavBar'
import axios from 'axios'

// User purchased properties component - displays list of properties bought by the user
const UserBoughtList = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  // Fetch user's purchased properties from backend
  const fetchData = async () => {
    const UserData = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.post('http://localhost:9000/api/user-bought-list', {
      userId: UserData?._id
    })
    if (response?.data?.code == 200) {
      setList(response?.data?.data)
    }
  }

  return (
    <>
      <NavBar />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <h1 className='text-primary text-center mb-4'>My Purchased Properties</h1>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-11 col-md-12">
            {/* Display properties table if user has purchases */}
            {list?.length > 0 ? (
              <div className="table-responsive shadow-sm">
                <table className="table table-hover table-striped mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" className="text-center">Sr No.</th>
                      <th scope="col">Property Title</th>
                      <th scope="col" className="text-center">Price</th>
                      <th scope="col" className="text-center">Area</th>
                      <th scope="col">Description</th>
                      <th scope="col">Location</th>
                      <th scope="col" className="text-center"> Property Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Property details rows */}
                    {list.map((item, index) => (
                      <tr key={index} className="align-middle">
                        <th scope="row" className="text-center fw-bold text-primary">{index + 1}</th>
                        <td className="fw-semibold">{item?.title}</td>
                        <td className="text-center text-success fw-bold">${item?.price}/month</td>
                        <td className="text-center">{item?.area}</td>
                        <td style={{maxWidth: '250px', wordWrap: 'break-word'}}>
                          {item?.description}
                        </td>
                        <td>{item?.location}</td>
                        <td className="text-center">
                          {/* Property thumbnail image */}
                          <img 
                            height="60" 
                            width="100" 
                            src={`http://localhost:9000/img/${item?.pic}`}
                            className="rounded border shadow-sm"
                            alt={item?.title}
                            style={{objectFit: 'cover'}}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Empty state when no properties are purchased */
              <div className="text-center py-5">
                <div className="text-muted mb-3">
                  <i className="fas fa-home fa-4x"></i>
                </div>
                <h4 className="text-muted">No Properties Found</h4>
                <p className="text-secondary">You haven't purchased any properties yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserBoughtList
