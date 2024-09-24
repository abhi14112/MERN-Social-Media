import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from "react-hot-toast"
import axios from 'axios';
import { login } from '../Redux/userSlice';
const Login = () => {

  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleData = (e) => {
    let { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", userData, {
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
      <form className='flex flex-col gap-2 -translate-y-24'>
        <h1 className='text-4xl'>Welcome Back</h1>
        <label className=' text-xl'>Email</label>
        <input value={userData.email} onChange={handleData} type='email' name='email' placeholder='Email ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <label className=' text-xl'>Password</label>
        <input value={userData.password} onChange={handleData} type='password' name='password' placeholder='Password ' className='outline-none w-full bg-transparent border border-zinc-600 rounded-md py-1 px-4' />
        <button className='bg-blue-600 rounded-lg font-semibold py-1' onClick={handleSubmit}>Login</button>
        <span>new user? <span className='text-blue-600'><Link to={"/signup"}>Signup</Link></span></span>
      </form>
    </section>
  )
}
export default Login