import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"

const Navbar = () => {
  return (
    <div>
      <nav className='py-4 bg-green-500 transition-all duration-75'>
        <ul className='px-4 flex gap-2 justify-between items-center font-bold text-white text-md'>
            <div>
              <img src={logo} className='w-14 rounded-full' alt="logo" />
            </div>
            <div className='flex justify-center items-center gap-4 px-4'>
            <Link to="/"><li>Home</li></Link>
            <Link to="/map"><li>map</li></Link>
            <Link to="/predict"><li>Make Prediction</li></Link>
            <Link to="/about"><li>About</li></Link>
            </div>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
