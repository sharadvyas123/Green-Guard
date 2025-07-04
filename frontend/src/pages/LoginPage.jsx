import React from 'react'
import axios from 'axios';
import { EyeIcon, ViewOffIcon } from 'hugeicons-react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, Bounce } from "react-toastify";
import logo from "../assets/logo.png"
import { motion } from "framer-motion";

const schema = yup.object().shape({
    username: yup.string().required("Username is required").min(3, "username must be atleast 3 character long"),
    password: yup.string().required("Password is required").min(6, "password is Too Short").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "PASSWORD is not STRONG!!"
    ),
});
const LoginPage = () => {
    const [eyeon, setEyeon] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onsubmit = async (data) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", data);
            const d = await response.data;
            if (d.access) {
                localStorage.setItem("token", d.access);
                reset();
                toast('✅ Login Successfull', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    onClose: () => navigate("/"),
                });
            }
        } catch (error) {
            reset();
            toast.error(<div>
                <strong>❌ Login Failed</strong>
                <div className="text-sm">Check username or password</div>
            </div>, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return (
        <>
            <div className="min-h-screen md:flex md:flex-row justify-center items-center md:gap-0  bg-gradient-to-br from-green-200 via-green-400 to-green-600 px-5 py-24">
                <div className='md:max-w-1/3 flex flex-col md:justify-start justify-center items-start md:gap-2'>
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src={logo} alt="logo" className='w-20 rounded-full my-5' />
                        <h1 className='text-5xl font-bold text-white'>Hello 👋</h1>
                        <h1 className='text-5xl font-bold text-white'>Green Guard ! </h1>
                        <h1 className='text-2xl font-bold text-white text-wrap'>Green Guard , Check your nearby tree population !!</h1>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 140 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='flex flex-col gap-6 justify-center items-center '>
                        <h1 className='text-3xl font-bold text-white my-5'>Login With Account </h1>
                        <form
                            onSubmit={handleSubmit(onsubmit)}
                            className="form flex  flex-col justify-center items-center p-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl z-10 border border-white/20"
                        >
                            <div>
                                <input
                                    {...register("username")}
                                    type="text"
                                    name="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="username"
                                />
                                {errors.username && (
                                    <p className="text-red-300 text-sm mt-1">{errors.username.message}</p>
                                )}
                            </div>
                            <br />
                            <div className="flex justify-center items-center relative">
                                <input
                                    {...register("password")}
                                    type={eyeon ? "text" : "password"}
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-75 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Password"
                                />
                                <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setEyeon(!eyeon);
                                    }}
                                >
                                    {eyeon ? <EyeIcon /> : <ViewOffIcon />}
                                </span>
                                {errors.password && (
                                    <p className="absolute bottom-[-1.5rem] text-red-300 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="text-white cursor-pointer bg-gradient-to-b from-[#fbc02d] to-[#f57c00] font-semibold py-2 px-6 rounded-full shadow-md w-80 mt-6 hover:bg-gradient-to-b hover:from-[#f57c00] hover:to-[#fbc02d] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-90"
                            >
                                Log in
                            </button>
                        </form>
                        <p className="text-sm mt-2">
                            Don't have an account?
                            <Link
                                to="/signin"
                                className="text-yellow-300 px-1 hover:text-yellow-500 font-semibold cursor-pointer"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default LoginPage
