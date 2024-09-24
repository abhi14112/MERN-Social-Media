import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import Post from '../components/Post';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
const Home = () => {
  const [active, setActive] = useState("for you");
  const [posts, setPosts] = useState([]);
  const getPosts = async()=>{
    try {
      const res = await axios.get("/api/posts/new",{withCredentials:true});
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  useEffect(()=>{
      getPosts();
  },[]);
  return (
    <div>
      <div className='flex justify-around border-b-[1px] border-zinc-600 px-4 py-4'>
      <Toaster position='top-right' />
        <div className=' hover:cursor-pointer' onClick={() => { setActive("for you") }}>
          <p>For You</p>
          <span className={`h-[3px] ${active == "for you" ? "block" : "hidden"} w-full  bg-blue-500 relative bottom-[-16px]  `}></span>
        </div>
        <div className="hover:cursor-pointer" onClick={() => { setActive("following") }}>
          <p>Following</p>
          <span className={`h-[3px] ${active == "following" ? "block" : "hidden"} w-full  bg-blue-500 relative bottom-[-16px] transition`}></span>
        </div>
      </div>
      <div>
          <Input/>
      </div>
      <div>
        {
          posts.length==0?<p>No posts</p>:posts.map((post)=>{return <Post key={post._id} text={post.text} />})
        }
      </div>
    </div>
  )
}
export default Home