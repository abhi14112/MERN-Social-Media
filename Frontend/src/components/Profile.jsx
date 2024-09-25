import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
const Profile = () => {
  const [profile, setProfile] = useState({});
  const {user} = useSelector((state)=>state.user);
  const { id } = useParams();
  const getProfile = async () => {
    const res = await axios.get(`/api/users/profile/${id}`);
    console.log(res.data);
    setProfile(res.data);
  }
  useEffect(() => {
    getProfile();
  }, [id])
  return (
    <>
      <div className='flex py-3 justify-center relative'>
        <div className='flex flex-col gap-2 items-center w-[90%]'>
          <img className='w-28 h-28  border-[2px] rounded-full object-cover' src='https://images.pexels.com/photos/20550233/pexels-photo-20550233/free-photo-of-leafless-trees-in-front-of-the-apartment-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
          <p>{profile?.name} </p>
          <p>@{profile?.username}</p>
          <p>{profile?.bio}</p>
          <div className='flex gap-4'>
            <p><span className='font-semibold'>{profile?.following?.length}</span> Following</p>
            <p><span className='font-bold'>{profile?.followers?.length}</span> Followers</p>
          </div>
        </div>
        <div className='absolute right-2 top-2'>
        {
          id == user._id && <button className='bg-white rounded-full text-black font-semibold py-1 px-2'>Edit Profile</button>
        }
        </div>
      </div>
      <div className='border-b-[1px] border-gray-700 px-4'>
        <div className="text-xl">Posts</div>
      </div>
      <div>
      </div>
    </>
  )
}
export default Profile