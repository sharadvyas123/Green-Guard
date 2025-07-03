import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center py-10 px-4'>
      {/* Title */}
      <h1 className='text-center text-3xl font-bold text-green-600 mb-8'>
        About Our Project & Team
      </h1>

      {/* Project Description Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='w-[80vw] bg-green-100 rounded-2xl p-6 shadow-xl'
      >
        <h2 className='text-xl font-semibold mb-3 text-green-800'>🌱 Project Overview</h2>
        <p className='text-gray-800 leading-relaxed'>
          <strong>GreenGuard</strong> is an AI-powered platform that uses real-time satellite imagery to monitor urban tree loss and promote reforestation. Our system utilizes machine learning and Sentinel Hub satellite data to generate visual heatmaps and identify critical areas in need of greenery restoration. It’s a collaborative tool to empower citizens, NGOs, and municipalities to take action.
        </p>
      </motion.div>

      {/* Team Member Cards */}
      <div className='flex flex-col md:flex-row justify-center gap-8 mt-12'>

        {/* Your Card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='w-[80vw] md:w-[30vw] bg-white rounded-2xl p-5 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'
        >
          <div className='flex flex-col items-center'>
            <img
              src='/your-profile.jpg'
              alt='Your Profile'
              className='w-28 h-28 rounded-full object-cover mb-4 border-4 border-green-400'
            />
            <h3 className='text-lg font-semibold text-green-700'>Sharad</h3>
            <p className='text-sm text-gray-600 text-center mt-2'>
              Full Stack Developer — Built the frontend in React and backend using Flask, integrated ML model and satellite data APIs.
            </p>
          </div>
        </motion.div>

        {/* Friend's Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='w-[80vw] md:w-[30vw] bg-white rounded-2xl p-5 shadow-lg hover:scale-105 transition-all duration-300 ease-in-out'
        >
          <div className='flex flex-col items-center'>
            <img
              src='/friend-profile.jpg'
              alt='Friend Profile'
              className='w-28 h-28 rounded-full object-cover mb-4 border-4 border-green-400'
            />
            <h3 className='text-lg font-semibold text-green-700'>Anmol </h3>
            <p className='text-sm text-gray-600 text-center mt-2'>
              ML Engineer — Designed and trained the deep learning model, collected and preprocessed real satellite data.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
