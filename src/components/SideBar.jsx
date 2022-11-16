import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri'
import { TbUsers } from 'react-icons/tb';
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
// import {logo} from '../assets'
import { links } from '../assets/constants'

import { Link } from 'react-router-dom';

import authService from '../services/auth.service';
import { setIsUserLogin } from '../redux/features/userSlice'
const NavLinks = ({ handleClick }) => (
  <div className='flex flex-wrap my-auto'>
    {links.map((item) => (
      <NavLink
        onClick={() => handleClick && handleClick()}
        key={item.name}
        to={item.to}
        className='flex flex-col justify-start items-center mx-8 text-sm font-medium text-gray-400 hover:text-cyan-400'>
        <item.icon className='w-6 h-6 mr-2' />
        {item.name}
      </NavLink>
    ))}
  </div>
)

const SideBar = () => {
  const { userData, isUserLogin } = useSelector((state) => state.user)

  const dispatch = useDispatch()


  return (
    <>
      <div className='absolute h-[4rem] bottom-0 left-0 right-0 flex justify-center bg-gradient-to-br from-gray-800 to-[#2a2a80] backdrop-blur-lg z-10'>
        {/* <img src={logo} alt='logo' className='w-full h-14 object-contain' /> */}
        <NavLinks />
        <div className="dropdown dropdown-top my-auto">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-16 rounded-full bg-white/30 p-1">
            {isUserLogin == true?
              <img src={`https://avatars.dicebear.com/api/big-smile/:${userData?._id}.svg`} />
              : <TbUsers className='p-1 w-full h-full'/>}
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            {isUserLogin === false ?
              <li><Link to='/login'>Login</Link></li> :
              <>
                <li>
                  <p className="">
                    {/* <span className="badge">Welcome</span> */}
                    Welcome, {userData?.username}
                  </p>
                </li>
                <li onClick={() => {
                  authService.handleLogout()
                  dispatch(setIsUserLogin(false))
                }}><Link to='/'>Logout</Link></li>
              </>
            }
          </ul>
        </div>

      </div>

      {/* <div className='absolute md:hidden block top-6 right-3'>
      {mobileMenuOpen ? (<RiCloseLine onClick={() => setMobileMenuOpen(false)} className='w-6 h-6 text-white mr-2' />): 
      <HiOutlineMenu onClick={() => setMobileMenuOpen(true)} className='w-6 h-6 text-white mr-2'/>}
    </div>

    <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition 
    ${mobileMenuOpen ? 'left-0' :'-left-full'}`}>
    {/* <img src={logo} alt='logo' className='w-full h-14 object-contain' /> */}
      {/* <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
    </div> */}

    </>
  )
};

export default SideBar;
