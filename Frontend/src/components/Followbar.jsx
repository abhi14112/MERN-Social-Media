import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Followbar = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async()=>{
    let  response = await axios.get("/api/users/tofollow");
    setUsers(response.data);
    console.log(response.data);
  }
  useEffect(()=>{
    getUsers();
  },[])
  return (
    <div className='p-5'>
    <div className='rounded-xl bg-zinc-700 p-3'>
      <p className='font-semibold'>Who to Follow</p>
      <div>
        <p>Follow me</p>
      </div>
    </div>
   
    </div>
  )
}

export default Followbar