import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RippleEffect from '../components/RippleEffect';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  useEffect(() => {

    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
    else{
      AOS.init({
        duration: 1000,
        once: false,
      });
    }
  }, []);

  const handleExploreClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{ 
          backgroundImage: "url('/images/forest-mountain.jpg')",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="text-center px-4 max-w-3xl">
          <motion.h1 
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome To Green Guard
          </motion.h1>
          <motion.p 
            className="text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Protecting our forests through technology and community engagement. Join us in our mission to preserve and monitor forest health for future generations.
          </motion.p>
          <motion.button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            onClick={handleExploreClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore More
          </motion.button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <RippleEffect 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="h-48 bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Forest Monitoring</h3>
              <p className="text-gray-700">Real-time monitoring of forest health and biodiversity using advanced sensors and AI technology.</p>
            </div>
          </RippleEffect>

          {/* Card 2 */}
          <RippleEffect 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="h-48 bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Tree Tracking</h3>
              <p className="text-gray-700">Track individual trees, their growth, health status, and contribute to global reforestation efforts.</p>
            </div>
          </RippleEffect>

          {/* Card 3 */}
          <RippleEffect 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="h-48 bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p className="text-gray-700">Learn about forest ecosystems, conservation techniques, and how you can make a difference.</p>
            </div>
          </RippleEffect>

          {/* Card 4 */}
          <RippleEffect 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="h-48 bg-green-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-700">Join a global community of environmental enthusiasts working together to protect our forests.</p>
            </div>
          </RippleEffect>
        </div>
      </div>
    </div>
  );
};

export default Home;