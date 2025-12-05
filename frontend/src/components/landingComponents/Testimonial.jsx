import React from 'react'

// Testimonials component - displays client feedback and reviews
const Testimonial = () => {
  return (
    <>
      <div className="row py-5 testimonial-bg">
        <div className="text-center mb-5">
          <h2 className="section-title fw-bold display-6  mb-3">What Our Clients Say</h2>
          <p className="lead text-muted">Discover why thousands of clients trust us with their real estate needs</p>
        </div>

        <div className="col-sm-10 mx-auto">
          <div className="row gy-4">

            {/* Client testimonial card */}
            <div className="col-md-4">
              <div className="card testimonial-card border-0 shadow-lg rounded-4 h-100 p-4 position-relative">
                <p className="testimonial-text mt-4 px-2">
                  "I was amazed by how easy it was to find the perfect property on this website. The interface is clean, the listings are detailed, and the support team was incredibly helpful. Highly recommended for anyone looking to buy or rent!"
                </p>
                <div className="star-rating mb-3 text-center">
                  <span className="text-warning fs-5">★★★★★</span>
                </div>
                {/* Client information */}
                <div className="d-flex align-items-center mt-4 pt-3 border-top">
                  <img src="img/profile photo2.jpg" className="testimonial-img me-3" alt="client" />
                  <div>
                    <b className="text-dark">Vishal</b><br />
                    <small className="text-primary fw-semibold">SELLING AGENT</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card testimonial-card border-0 shadow-lg rounded-4 h-100 p-4 position-relative">

                <p className="testimonial-text mt-4 px-2">
                  "This real estate website made my home search smooth and stress-free. I loved the advanced filters and virtual tour feature – it saved me so much time. Definitely the best platform I've used!"
                </p>
                <div className="star-rating mb-3 text-center">
                  <span className="text-warning fs-5">★★★★★</span>
                </div>
                <div className="d-flex align-items-center mt-4 pt-3 border-top">
                  <img src='img/profile photo5.jpg' className="testimonial-img me-3" alt="client" />
                  <div>
                    <b className="text-dark">Shubham </b><br />
                    <small className="text-primary fw-semibold">SELLING AGENT</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card testimonial-card border-0 shadow-lg rounded-4 h-100 p-4 position-relative">

                <p className="testimonial-text mt-4 px-2">
                  "As a first-time buyer, I found everything I needed in one place. The website is user-friendly, and the property details were accurate and up to date. It made the entire process feel simple and secure."
                </p>
                <div className="star-rating mb-3 text-center">
                  <span className="text-warning fs-5">★★★★★</span>
                </div>
                <div className="d-flex align-items-center mt-4 pt-3 border-top">
                  <img src='img/profile photo4.jpg' className="testimonial-img me-3" alt="client" />
                  <div>
                    <b className="text-dark">Ankit </b><br />
                    <small className="text-primary fw-semibold">SELLING AGENT</small>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial
