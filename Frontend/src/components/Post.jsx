import React from 'react'
import { IoChatbubbleOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
const Post = ({text,img}) => {
    return (
        <div className='p-4 flex gap-2 border-b-[1px] border-zinc-800'>
            <div className='w-max'>
                <img className='w-12 h-12 rounded-full object-cover' src='https://images.pexels.com/photos/28277459/pexels-photo-28277459/free-photo-of-a-large-wave-crashing-into-the-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div>
            <div className='w-[80%] flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <p className='font-semibold'>Abhishak kumar</p>
                        <p className='opacity-70'>@abhi</p>
                    </div>
                    <div>
                        <p>...</p>
                    </div>
                </div>
                <div className='mt-4 flex flex-col gap-2'>
                    <p>{text}</p>
                    {
                        img && <img className='rounded-lg' src={img}/>
                    }
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='flex gap-1 items-center'>
                            <IoChatbubbleOutline/>
                        <p className='opacity-70'>0</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <CiHeart color='white' size={18}/>
                        <p className='opacity-70'>0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post