import React from 'react';
import CountUp from 'react-countup';

// Statistics counter component - displays company achievements with animations
const Counter = () => {
  return (
    <>
      <div className="row  py-5 counter-bg"> 
        <div className="col-10 mx-auto">
          <div className="row text-center g-4">

            {/* Total Area counter */}
            <div className="col-6 col-sm-3 mb-4">
              <img src="/img/c11.png" className="counter-img mb-2" alt="Total Area" />
              <p className="counter-number display-6 fw-bold text-primary mb-1">
                <CountUp start={0} duration={2} end={560} />+
              </p>
              <p className="counter-text text-muted">Total Area Sq</p>
            </div>

            {/* Apartments Sold counter */}
            <div className="col-6 col-sm-3 mb-4">
              <img src="/img/c2.png" className="counter-img mb-2" alt="Apartments Sold" />
              <p className="counter-number display-6 fw-bold text-success mb-1">
                <CountUp start={0} duration={2} end={197} />K+
              </p>
              <p className="counter-text text-muted">Apartments Sold</p>
            </div>

            {/* Total Constructions counter */}
            <div className="col-6 col-sm-3 mb-4">
              <img src="/img/c3.png" className="counter-img mb-2" alt="Total Constructions" />
              <p className="counter-number display-6 fw-bold text-danger mb-1">
                <CountUp start={0} duration={2} end={268} />+
              </p>
              <p className="counter-text text-muted">Total Constructions</p>
            </div>

            {/* Apartio Rooms counter */}
            <div className="col-6 col-sm-3 mb-4">
              <img src="/img/c4.png" className="counter-img mb-2" alt="Apartio Rooms" />
              <p className="counter-number display-6 fw-bold text-warning mb-1">
                <CountUp start={0} duration={2} end={340} />+
              </p>
              <p className="counter-text text-muted">Apartio Rooms</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Counter;
