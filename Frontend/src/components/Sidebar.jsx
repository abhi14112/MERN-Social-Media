import React from 'react'
import { BsBellFill, BsHouseFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BsTwitter } from 'react-icons/bs'
import SidebarItem from './SidebarItem'
import { BiLogOut } from 'react-icons/bi'
import { FaFeather } from 'react-icons/fa'
import { logout } from '../Redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'
const Sidebar = () => {
  let {user} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const handleLogout = ()=>{
    dispatch(logout());
  }
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill
    },
    {
      label: 'Profile',
      href: `/profile/${user._id}`,
      icon: FaUser
    }
  ];
  return (
    <div className='md:flex  flex-col  p-2 gap-4 items-center md:items-start '>
    <div className='w-max cursor-pointer  justify-center rounded-full p-3 hover:bg-slate-400 hover:bg-opacity-15'>
      <BsTwitter color='white' size={28} />
    </div>
      <div>
        {items.map((item)=>{
          return <SidebarItem label={item.label} key={item.href} icon={item.icon} href={item.href}/>
        })}
      </div>
      <SidebarItem icon={BiLogOut}  click={handleLogout}  label={"Logout"} href={"/logout"}/>
      <div>
        <div className="p-3 rounded-full bg-sky-500 md:hidden block  w-max">
            <FaFeather color='white' size={28}/>
        </div>
        <div className='w-max justify-center rounded-full p-3 hover:bg-slate-400 hover:bg-opacity-15  items-center text-xl md:block hidden'>
          <p>Tweet</p>
        </div>
      </div>
    </div>
  )
}
export default Sidebar;