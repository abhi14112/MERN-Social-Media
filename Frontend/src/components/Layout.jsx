import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Followbar from './Followbar'
import Header from './Header'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
const Layout = ({ children }) => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className="bg-black text-white w-screen min-h-screen grid grid-cols-4 px-3 md:px-4">
        <div className='hover:cursor-pointer absolute right-4 top-4 md:hidden' onClick={()=>{setSideBarOpen((prev)=>!prev)}}>
        {
          sideBarOpen?
        <IoClose size={32}/>:
        <RxHamburgerMenu size={28}/>
        }
        </div>
      <div className={`md:col-span-1  md:block ${sideBarOpen?"block":"hidden"} pl-2 md:pl-4 lg:pl-6 h-screen md:sticky md:top-0 `}>
        <Sidebar />
      </div>
      <div className={`${sideBarOpen?"col-span-3":"col-span-4"} md:col-span-3 lg:col-span-2 xs:border-none md:border-x-[1px] md:border-zinc-800`}>
      <Header/>
        {children}
      </div>
      <div className='hidden lg:block h-screen sticky top-0'>
        <Followbar />
      </div>
    </div>
  )
}
export default Layout