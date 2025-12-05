import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import myLogo from '../../assets/Nav_logo.png';
import Swal from 'sweetalert2';
import { FaSignOutAlt } from 'react-icons/fa';

// Navigation component - adapts based on user type (admin/user/guest)
const NavBar = () => {
  const navigate = useNavigate();
  const [useData, setUserData] = useState(null);

  // Check user authentication status on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    setUserData(user);
  }, []);

  // Handle user logout with confirmation
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserData(null);
    navigate('/');
    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "success"
    });
  };

  // Admin navigation bar
  if (useData?.userType === "admin") {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
          <div className="container">
            <NavLink className="navbar-brand text-primary fw-bold fs-4 d-flex align-items-center gap-2" to="/">
              <img src={myLogo} alt="Logo" />
            </NavLink>
            <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* Admin navigation links */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/" end>Home</NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/admin-list"> Properties </NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/admin-sold">Sold Properties</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/admin-user">User Directory</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/admin-contact">Query list</NavLink></li>
              </ul>
              {/* Admin action buttons */}
              <div className="d-flex align-items-center gap-2">
                <Link to='/admin-add'><button className="btn btn border rounded-pill px-4 py-2 fw-semibold">Add Property</button></Link>
                <Link to='/admin-profile'><button className="btn border rounded-pill px-4 py-2 fw-semibold">My Profile</button></Link>
                <button className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-3 py-2 fw-semibold" onClick={handleLogout}>
                  <FaSignOutAlt /> <span className="d-none d-md-inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  } else if (useData?.userType === "user") {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
          <div className="container">
            <NavLink className="navbar-brand text-primary fw-bold fs-4 d-flex align-items-center gap-2" to="/">
              <img src={myLogo} alt="Logo" />
            </NavLink>
            <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              {/* User navigation links */}
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/" end>Home</NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/user-property">Property List</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/services">Our Services</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/about">About Us</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/ContactUs">Contact Us</NavLink></li>
              </ul>
              <div className="d-flex align-items-center gap-2">
                <Link to='/user-bought'><button className="btn border rounded-pill px-4 py-2 fw-semibold">Bought list</button></Link>
                <Link to='/user-profile'><button className="btn border rounded-pill px-4 py-2 fw-semibold"> My Profile</button></Link>
                <button className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-3 py-2 fw-semibold" onClick={handleLogout}>
                  <FaSignOutAlt /> <span className="d-none d-md-inline">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-2">
          <div className="container">
            <NavLink className="navbar-brand text-dark fw-bold fs-4 d-flex align-items-center gap-2" to="/">
              <img src={myLogo} alt="Logo" />
            </NavLink>
            <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link text-dark fw-semibold" to="/" end>Home</NavLink>
                </li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/property">Properties</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/services">Our Services</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/ContactUs">Contact Us</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-dark fw-semibold" to="/about">About Us</NavLink></li>

              </ul>
              <div className="d-flex align-items-center gap-2">
                <Link to='/register'><button className="btn1 rounded-pill px-4 py-2 fw-semibold">Register</button></Link>
                <Link to='/login'><button className="btn btn-secondary rounded-pill px-4 py-2 fw-semibold">Login</button></Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
};

export default NavBar;
