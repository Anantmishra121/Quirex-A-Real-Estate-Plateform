import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'; 

// About page component - displays company information and call-to-action buttons
const About = () => {
  return (
    <>
      <NavBar /> 

      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 72px)", background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
        <div className="container">
          <div className="row align-items-center gy-5">
            {/* Company image with animation */}
            <div className="col-md-6" data-aos="fade-right" data-aos-duration="1000">
              <div className="position-relative overflow-hidden rounded-4 shadow-lg hover-scale">
                <img
                  src="/img/About Quirex.png"
                  alt="About Quirex - Your trusted real estate partner"
                  className="img-fluid w-100 h-100 object-fit-cover transition-all"
                  style={{ maxHeight: "420px" }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-br from-primary/10 to-transparent"></div>
              </div>
            </div>

            {/* Company description and navigation buttons */}
            <div className="col-md-6 ps-md-4" data-aos="fade-left" data-aos-duration="1000">
              <h1 className="mb-4 fw-bold text-dark display-5 lh-sm">
                Your Trusted <span className="text-primary">Real Estate</span> Partner
              </h1>
              <p className="lead text-secondary mb-4 fs-5 lh-base">
                Welcome to <strong className="text-primary">Quirex</strong> – where your property dreams become reality. We're dedicated to delivering exceptional real estate experiences tailored to your unique needs.
              </p>
              <p className="text-muted mb-4 fs-6 lh-relaxed">
                With our passionate team of experts and innovative technology platform, we make property buying, selling, and renting seamless, transparent, and secure for everyone.
              </p>
              {/* Action buttons for user engagement */}
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/ContactUs" className="btn btn-primary rounded-pill px-5 py-3 shadow-sm fw-medium text-decoration-none">
                  Get In Touch
                </Link>
                <Link to="/property" className="btn btn-outline-primary rounded-pill px-5 py-3 fw-medium text-decoration-none">
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
