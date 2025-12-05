import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaKey,
  FaBuilding,
  FaStore,
  FaGavel,
  FaCouch
} from "react-icons/fa";

// Services component - showcases main real estate services offered
const Services = () => {
  const location = useLocation();

  return (
    <>
      {/* Show navbar only if not on home page */}
      {location?.pathname !== "/" && <NavBar />}
      <div className="row py-5 services-bg text-dark">
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">Our Main Focus</h2>
        </div>
        <div className="col-sm-10 mx-auto">
          <div className="row g-4">
            {/* Home buying service */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaHome className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Buy a home</h5>
                <p className="text-muted small">
                  Explore listings of verified homes across cities with budget-fit options.
                </p>
              </div>
            </div>

            {/* Home rental service */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaKey className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Rent a home</h5>
                <p className="text-muted small">
                  Find rental properties that match your needs instantly and securely.
                </p>
              </div>
            </div>

            {/* Home selling service */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaBuilding className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Sell a home</h5>
                <p className="text-muted small">
                  List your home with expert support and attract verified buyers fast.
                </p>
              </div>
            </div>

            {/* Commercial property service */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaStore className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Commercial Property</h5>
                <p className="text-muted small">
                  Invest in office spaces, retail units, and commercial lands seamlessly.
                </p>
              </div>
            </div>

            {/* Legal assistance service */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaGavel className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Property Legal Help</h5>
                <p className="text-muted small">
                  Get assistance on title checks, documentation, and legal clearances.
                </p>
             
              </div>
            </div>

            {/* 6. Interior Design */}
            <div className="col-md-4 col-sm-6">
              <div className="card service-card h-100 shadow-lg p-4 border-0 rounded-4 text-center">
                <FaCouch className="service-icon mb-3 bounce-icon" />
                <h5 className="fw-bold mb-2">Interior Design</h5>
                <p className="text-muted small">
                  Style your home with modern, budget-friendly interior design services.
                </p>
             
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
