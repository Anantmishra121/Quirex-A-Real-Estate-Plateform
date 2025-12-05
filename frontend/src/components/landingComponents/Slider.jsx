import React from 'react';
import { FaHome } from "react-icons/fa";
import Typewriter from 'typewriter-effect';
// Local background image
import heroBg from '../../assets/slider_bg.jpg';

const Slider = () => {
  return (
    <>
      <div
        className="slider-bg d-flex align-items-center"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Text Content */}
            <div className="col-lg-8 offset-lg-2 mb-4 text-white text-center" data-aos="fade-right">
          
              <b className="display-4 fw-bold d-block">
                <Typewriter
                  options={{
                    strings: ['Find Your Dream Home'],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: 'typewriter-text'
                  }}
                />
              </b>
              <p className='mt-3 text-dark fs-6'>
                Discover your dream property effortlessly with "Quirex" – your trusted real estate partner.
                <br/>
                Browse verified listings, explore virtual tours, and connect with top agents instantly.
                <br/>
                Smart search. Secure deals. Seamless experience – all in one place.
              </p>
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
