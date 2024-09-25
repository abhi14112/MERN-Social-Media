import React from 'react'
import { BiArrowBack } from "react-icons/bi";
import {  useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className='border-b-[1px] border-zinc-700 p-3'>
            {location.pathname == "/" ? <p className='font-semibold text-xl'>Home</p> :
            <div className='hover:cursor-pointer' onClick={()=>{navigate("/")}}>
                <BiArrowBack color="white" size={20} />
            </div>
            }
        </div>
    )
}
export default Header