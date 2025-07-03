import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center text-center gap-4">
        <p className="text-sm">
          All Rights Reserved &copy; 2025 || <Link to="https://sharadvyas132@gmail.com" className='px-2'> sharadvyas132@gmail.com</Link> & <Link className='px-2' to="https://dragz114w@gmail.com"> dragz114w@gmail.com</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
