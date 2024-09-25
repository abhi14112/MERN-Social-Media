import React from 'react'
import { useNavigate} from "react-router-dom"
const SidebarItem = ({ label, icon: Icon, href ,click}) => {
    const navigate = useNavigate();
    return (
        <div className="cursor-pointer" onClick={
            ()=>{href=="/logout"?click():navigate(href)}
            }>
            <div className=' gap-2 items-center rounded-full p-3 hover:bg-opacity-10 hover:bg-zinc-300 w-max hidden md:flex '>
                <Icon color="white" size={28} />
                <h1 className='text-xl'>{label}</h1>
            </div>
            <div>
                <div className='items-center rounded-full px-3 py-3 hover:bg-opacity-10 hover:bg-zinc-300 w-max md:hidden'>
                    <Icon color="white" size={28} />
                </div>
            </div>
        </div>
        )
}

export default SidebarItem