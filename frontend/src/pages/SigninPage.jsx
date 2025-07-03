import React, { useState } from 'react';
import { EyeIcon, ViewOffIcon } from 'hugeicons-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "PASSWORD is not STRONG!!"),
  repassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const Signin = () => {
  const navigate = useNavigate();
  const [eyeon, setEyeon] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/register/", data)
      reset();
      const d = await response.data;
      if (d.token.access) {
        // store token in local storage
        localStorage.setItem("token", d.token.access);
        console.log("Token set:", d.token.access);
        toast("Signup successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose: () => navigate("/"),
        });
      } else {
        console.log("sigin failed:", d.message);
      }
    } catch (error) {
      console.error("bhai bhul padi whala", error)
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center bg-gradient-to-br from-green-200 via-green-400 to-green-600 px-5 py-24">
  
      <h1 className='text-4xl font-bold py-5'>Sign UP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form flex gap-2 flex-col justify-center items-center p-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl z-10 border border-white/20 w-[90%] max-w-md">
        <input {...register('username')} placeholder="Username" className='bg-gray-50 text-black rounded-lg p-1.5 w-full' />
        <p className='text-red-300 text-sm'>{errors.username?.message}</p>

        <input {...register('email')} type="email" placeholder="Email" className='bg-gray-50 text-black rounded-lg p-1.5 w-full' />
        <p className='text-red-300 text-sm'>{errors.email?.message}</p>

        <div className='flex justify-center items-center w-full relative'>
          <input {...register('password')} type={eyeon ? "text" : "password"} placeholder="Enter Password" className='bg-gray-50 text-black rounded-lg p-1.5 w-full pr-10' />
          <span className='absolute right-3 top-2 cursor-pointer text-black' onClick={() => setEyeon(!eyeon)}>
            {eyeon ? <EyeIcon /> : <ViewOffIcon />}
          </span>
        </div>
        <p className='text-red-300 text-sm w-full text-left'>{errors.password?.message}</p>

        <input {...register('password2')} type="password" placeholder="Re-Enter Password" className='bg-gray-50 text-black rounded-lg p-1.5 w-full' />
        <p className='text-red-300 text-sm'>{errors.repassword?.message}</p>

        <button type="submit" className='text-white cursor-pointer bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-full mt-3 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90'>
          Sign In
        </button>
      </form>

      <div className='mt-2'>
        <p>Already have an account?
          <Link to='/login' className="text-yellow-300 px-1 hover:text-yellow-500 font-semibold cursor-pointer">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
