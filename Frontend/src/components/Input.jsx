import React, { useState } from 'react'
import axios from 'axios';
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
const Input = () => {
    const {user} = useSelector((state)=>state.user);
    const [postText, setPostText] = useState("");
    const handlePost =async () => {
        if(!postText)
        {
            return toast.error("write to create post");
        }
        const data = {text:postText,postedBy:user._id};
        console.log(data);
        const res = await axios.post("http://localhost:4000/api/posts/create",data,{withCredentials:true});
        setPostText("");
    }
    return (
        <div >
            <div className='w-full border-b-[1px] border-zinc-800'>
                <textarea onChange={(e)=>{setPostText(e.target.value)}} value={postText} placeholder='What is happening?' className='resize-none w-full  outline-none bg-transparent p-4' />
            </div>
            <div className='flex justify-end border-b-[1px] border-zinc-800 py-1 px-4 '>
                <button onClick={handlePost} className='bg-blue-500 rounded-full px-3 py-1 text-xl' >Post</button>
            </div>
        </div>
    )
}

export default Input