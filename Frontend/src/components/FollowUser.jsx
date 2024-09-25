import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
const FollowUser = ({followUser,id}) => {
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.user);
  const [follow, setFollow] = useState(false);
  const {name, username,profilePic} = followUser;
  useEffect(()=>{
    if(followUser?.followers.includes(user._id)){
      setFollow(true);
    }
  },[])
  const handleFollow = async() => {
    const res = await axios.put(`http://localhost:4000/api/users/follow/${followUser._id}`,{data:"null"},{withCredentials:true});
    setFollow((prev)=>!prev);
  }
  const handleProfileView = ()=>{
    navigate(`/profile/${id}`);
  }
  return (
    <div className='flex justify-between'>
        <div className='flex gap-1'>
           <div>
            <img className='w-12 h-12 rounded-full object-cover' src={"https://images.pexels.com/photos/28336603/pexels-photo-28336603/free-photo-of-the-tower-bridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}/>
           </div> 
           <div>
            <p>{name}</p>
            <p onClick={handleProfileView} className='opacity-70 cursor-pointer hover:opacity-100'>@{username}</p>
           </div>
        </div>
        <div>
            <button onClick={handleFollow} className='text-black bg-white font-semibold rounded-full  px-2 py-1 shadow-sm'>{follow?"Unfollow":"Follow"}</button>
        </div>
    </div>
  )
}
export default FollowUser