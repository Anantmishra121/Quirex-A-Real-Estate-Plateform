import React from 'react';
import { FaDribbble, FaInstagram, FaRegEnvelope, FaTwitter } from "react-icons/fa";
import { FaLocationDot, FaFacebookF } from "react-icons/fa6";

// Top navigation bar component - displays contact info and social media links
const TopNavbar = () => {
  return (
    <>
      <div className="topbar-bg py-2 shadow-sm px-3">
        <div className="container-fluid">
          <div className="row align-items-center">

            {/* Company contact information */}
            <div className="col-md-6 d-flex flex-column flex-sm-row justify-content-sm-between justify-content-center text-center text-sm-start gap-2 gap-sm-0">
              <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start">
                <FaRegEnvelope className="top-icon" />
                <span className="text-light small">Quirex@gmail.com</span>
              </div>
              <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start">
                <FaLocationDot className="top-icon" />
                <span className="text-light small">  Lucknow, Uttar Pradesh</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="col-md-6 text-md-end text-center mt-2 mt-md-0">
              <div className="d-inline-flex align-items-center gap-3 social-icons justify-content-center">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaFacebookF className="social-icon" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaTwitter className="social-icon" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaInstagram className="social-icon" />
                </a>
                <a href="" target="_blank" rel="noopener noreferrer" className="text-light">
                  <FaDribbble className="social-icon" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
