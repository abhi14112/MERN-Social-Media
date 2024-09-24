import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast"
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {login} from "../Redux/userSlice.js";
const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "", username: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  const handleData = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(login(response.data));
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  return (
    <section className='flex items-center justify-center h-screen w-screen bg-black text-white '>
      <Toaster position='top-right' />
      <form className='flex flex-col gap-1 -translate-y-24'>
        <h1 className='text-4xl'>Join Us Today</h1>
        <label className=' text-xl'>Name</label>
        <input onChange={handleData} value={userData.name} type='text' name='name' placeholder='Name ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <label className=' text-xl'>Username</label>
        <input onChange={handleData} type='text' name='username' value={userData.username} placeholder='Username ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <label className=' text-xl'>Email</label>
        <input onChange={handleData} type='email' value={userData.email} name='email' placeholder='Email ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <label className=' text-xl'>Password</label>
        <input onChange={handleData} type='password' name='password' value={userData.password} placeholder='Password ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <button className='bg-blue-600 rounded-lg font-semibold py-1' onClick={handleSubmit}>Sign Up</button>
        <span>have an account? <span className='text-blue-600'><Link to={"/login"}>signin</Link></span></span>
      </form>
    </section>
  )
}
export default Signup