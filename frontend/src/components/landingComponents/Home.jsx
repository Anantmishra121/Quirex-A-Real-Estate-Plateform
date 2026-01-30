import React from 'react'
import Slider from './Slider';
import Counter from './Counter';
import Services from './Services';
import Property from './Property';
import OurAnimities from './OurAnimities';
import Testimonial from './Testimonial'; 
import NavBar from './NavBar';

// Home page component - main landing page with all sections
const Home = () => {
  return (
    <>
      <NavBar/>
      {/* Hero section with main slider */}
      <Slider />
      {/* Services overview */}
      <Services />
      {/* Featured properties */}
      <Property />
      {/* Company amenities showcase */}
      <OurAnimities />
      {/* Customer testimonials */}
      <Testimonial /> 
      {/* Company statistics */}
      <Counter />
    </>
  )
}

export default Home
