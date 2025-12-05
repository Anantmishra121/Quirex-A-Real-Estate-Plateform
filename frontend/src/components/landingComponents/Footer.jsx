import React from 'react';
import { CiLocationOn } from "react-icons/ci";
import { LuPhoneCall } from "react-icons/lu";
import { BsEnvelope } from "react-icons/bs";
import { ImFacebook } from "react-icons/im";
import { IoLogoTwitter } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { BiLogoTelegram } from "react-icons/bi";
import myLogo from '../../assets/Footer_logo.png';

// Footer component - displays company info, links, and contact details
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        {/* Company information and contact details */}
        <div className="footer-section">
          <div className="d-flex align-items-center mb-3 logo fw-bold fs-5 text-white">
            <img src={myLogo} className='me-2' alt="logo" style={{width: '120px'}} /> 
          </div>
          <p className="footer-text">
            Experience property hunting like never before with Quirex, your smart real estate companion.
          </p>
          {/* Contact information */}
          <div className="footer-contact">
            <p><CiLocationOn className='me-2' />Lucknow</p>
            <p><LuPhoneCall className='me-2' />+91 97XXXXXXXX</p>
            <p><BsEnvelope className='me-2' />Quirex@gmail.com</p>
          </div>
          {/* Social media links */}
          <div className="footer-social">
            <a href="#" className="social-icon"><ImFacebook /></a>
            <a href="#" className="social-icon"><IoLogoTwitter /></a>
            <a href="#" className="social-icon"><FaLinkedin /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
        </div>

        {/* Company navigation links */}
        <div className="footer-section">
          <h5 className='footer-title'>Company</h5>
          <ul className="footer-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">All Products</a></li>
            <li><a href="#">Locations Map</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>

        {/* Service links */}
        <div className="footer-section">
          <h5 className='footer-title'>Services</h5>
          <ul className="footer-links">
            <li><a href="#">Order tracking</a></li>
            <li><a href="#">Wish List</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Promotional Offers</a></li>
          </ul>
        </div>

        {/* Newsletter signup and payment methods */}
        <div className="footer-section">
          <h5 className='footer-title'>Newsletter</h5>
          <p className="footer-text">Subscribe to our weekly Newsletter and receive updates via email.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email*" className="newsletter-input" />
            <button className="newsletter-button"><BiLogoTelegram /></button>
          </div>
          <h6 className="footer-title mt-3">We Accept</h6>
          <div className="payment-icons">
            <img src='/img/payment-4.png' alt="payment-methods" className="img-fluid" />
          </div>
        </div>
      </div>

      {/* Copyright and legal links */}
      <div className="footer-bottom">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="small">
            All Rights Reserved @ Anant Mishra {new Date().getFullYear()}
          </div>
          <div className="d-flex gap-3">
            <a href="#" className="text-white">Terms & Conditions</a>
            <a href="#" className="text-white">Claim</a>
            <a href="#" className="text-white">Privacy & Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
