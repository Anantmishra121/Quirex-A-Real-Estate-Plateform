import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import axios from 'axios';
import Swal from 'sweetalert2';

// Property listing component - displays available properties with buy functionality
const Property = () => {
  const [listData, setListData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // Get user data from localStorage for authentication check
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserData(user);
    
    // Load Razorpay script
    loadRazorpayScript();
  }, []);

  // Load Razorpay checkout script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fetch property list from backend API
  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/property-list');
    if (response?.data?.code === 200) {
      setListData(response?.data?.data);
    }
  };

  const location = useLocation();
  const navigate = useNavigate();

  // Handle property purchase with Razorpay payment
  const handleBuy = async (propertyId, price) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (!userData?._id) {
      Swal.fire({
        title: "Registration Required",
        text: "Please register & login to buy a property",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Register Now',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/register');
        }
      });
      return;
    }
    
    // Prevent admin from buying properties
    if (userData?.userType === "admin") {
      Swal.fire({
        title: "Access Denied",
        text: "Admins cannot buy properties",
        icon: 'warning'
      });
      return;
    }

    try {
      setLoading(true);
      
      // Parse price - remove any non-numeric characters except decimal
      const numericPrice = parseFloat(price.toString().replace(/[^0-9.]/g, ''));
      
      // Create order on backend
      const orderResponse = await axios.post('http://localhost:9000/api/payment/create-order', {
        amount: numericPrice,
        propertyId: propertyId,
        userId: userData._id
      });

      if (orderResponse?.data?.code !== 200) {
        Swal.fire({
          title: "Error",
          text: orderResponse?.data?.message,
          icon: 'error'
        });
        setLoading(false);
        return;
      }

      // Get Razorpay key
      const keyResponse = await axios.get('http://localhost:9000/api/payment/get-razorpay-key');
      const razorpayKey = keyResponse?.data?.data?.key;

      const { orderId, amount, currency, propertyTitle } = orderResponse.data.data;

      // Configure Razorpay options
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Quirex Real Estate',
        description: `Purchase: ${propertyTitle}`,
        order_id: orderId,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyResponse = await axios.post('http://localhost:9000/api/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              propertyId: propertyId,
              userId: userData._id
            });

            if (verifyResponse?.data?.code === 200) {
              Swal.fire({
                title: "Success!",
                text: "Payment successful! Property purchased.",
                icon: 'success'
              });
              fetchData(); // Refresh property list
            } else {
              Swal.fire({
                title: "Payment Failed",
                text: verifyResponse?.data?.message,
                icon: 'error'
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error",
              text: "Payment verification failed. Please contact support.",
              icon: 'error'
            });
          }
        },
        prefill: {
          name: userData?.name || '',
          email: userData?.email || '',
          contact: userData?.contact || ''
        },
        notes: {
          propertyId: propertyId,
          userId: userData._id
        },
        theme: {
          color: '#667eea'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        Swal.fire({
          title: "Payment Failed",
          text: response.error.description,
          icon: 'error'
        });
      });
      razorpay.open();
      setLoading(false);

    } catch (error) {
      console.error('Payment error:', error);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: 'error'
      });
      setLoading(false);
    }
  };

  // Split the data into chunks of 4
  const chunkedList = [];
  for (let i = 0; i < listData.length; i += 4) {
    chunkedList.push(listData.slice(i, i + 4));
  }

  return (
    <>
      {location?.pathname !== "/" && <NavBar />}

      <div className='container-fluid property-section py-5'>
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">Featured Properties</h2>
        </div>

        {chunkedList.length > 0 ? (
          chunkedList.map((group, groupIndex) => (
            <div className='row justify-content-center px-3 mb-4' key={groupIndex}>
              {group.map((item, index) => (
                <div className='col-12 col-sm-6 col-md-3 mb-4' key={index}>
                  <div className="card h-100 border-0 rounded-4 overflow-hidden property-card position-relative" 
                       data-aos="zoom-in" 
                       data-aos-duration="800"
                       style={{
                         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                         transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          transformOrigin: 'center center'
                        }}
                      />
                      <div className="position-absolute top-0 start-0 w-100 h-100"
                           style={{
                             background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
                             transition: 'background 0.4s ease'
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

                        {/* Action Button */}
                        {userData?.userType !== "admin" && (
                          <button 
                            onClick={() => handleBuy(item?._id, item?.price)} 
                            disabled={loading}
                            className='btn btn-sm rounded-pill px-4 py-2 fw-semibold property-btn-primary'
                            style={{
                              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                              border: 'none',
                              color: 'white',
                              fontSize: '0.9rem',
                              boxShadow: '0 4px 15px rgba(0,123,255,0.3)',
                              opacity: loading ? 0.7 : 1
                            }}>
                            {loading ? 'Processing...' : 'Buy Now'}
                          </button>
                        )}
                        
                        {userData?.userType === "admin" && (
                          <span className="badge rounded-pill px-3 py-2"
                                style={{
                                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                                  color: 'white',
                                  fontSize: '0.8rem'
                                }}>
                            Admin View
                          </span>
                        )}
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
  );
};

export default Property;
