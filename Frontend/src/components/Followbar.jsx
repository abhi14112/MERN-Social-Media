import React, { useEffect, useState } from 'react'
import FollowUser from './FollowUser';
import axios from 'axios'
const Followbar = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    let response = await axios.get("/api/users/tofollow");
    console.log(response.data);
    setUsers(response.data);
  }
  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div className='p-5'>
      <div className='rounded-xl bg-zinc-700 p-3'>
        <p className='font-semibold text-xl mb-2'>Who to Follow</p>
        <div className='flex flex-col gap-5'>
          {users &&
            users.map((user) => (<FollowUser id={user._id} key={user._id} followUser={user} />))
          }
        </div>
      </div>
    </div>
  )
}

export default Followbar