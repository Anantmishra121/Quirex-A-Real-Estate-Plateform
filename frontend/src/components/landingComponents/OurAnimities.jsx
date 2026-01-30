import React from 'react';
import { IoCarOutline } from "react-icons/io5";
import { LiaSwimmingPoolSolid, LiaBedSolid } from "react-icons/lia";
import { BsShieldCheck } from "react-icons/bs";
import { GiStethoscope, GiJapaneseBridge } from "react-icons/gi";
import { IoLibraryOutline } from "react-icons/io5";
import { TbHomeShield } from "react-icons/tb";

// Amenities showcase component - displays property facilities and features
const OurAnimities = () => {
  return (
    <>
      <div className="row amenities-bg py-5">
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold">On-Site Facilities</h2>
        </div>

        <div className="col-sm-10 mx-auto g-4">
          <div className="row">
            {/* Amenities list with icons and descriptions */}
            {[
              { icon: <IoCarOutline />, label: 'Parking Space' },
              { icon: <LiaSwimmingPoolSolid />, label: 'Swimming Pool' },
              { icon: <BsShieldCheck />, label: 'Private Security' },
              { icon: <GiStethoscope />, label: 'Medical Center' },
              { icon: <IoLibraryOutline />, label: 'Library Area' },
              { icon: <LiaBedSolid />, label: 'King Size Beds' },
              { icon: <TbHomeShield />, label: 'Smart Homes' },
              { icon: <GiJapaneseBridge />, label: 'Flaticon-Slider' },
            ].map((item, index) => (
              <div className="col-12 col-sm-6 col-md-3 mb-4" key={index} data-aos="zoom-in" data-aos-duration="800">
                <div className="amenity-card shadow-sm text-center p-4 rounded-4 h-100">
                  <div className="amenity-icon text-primary mb-3 fs-1">{item.icon}</div>
                  <h6 className="fw-bold text-dark">{item.label}</h6>
                  <button className="arrow-btn mt-3">→</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurAnimities;
