import {useState} from 'react'
import { NavLink } from 'react-router-dom';
import {RiCloseLine} from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi';
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import {useAddNewPlaylistMutation} from '../redux/services/rhythmUser'

// import {logo} from '../assets'
import {links ,userId} from '../assets/constants'

const NavLinks = ({handleClick}) =>(
  <div className='mt-10'>
    {links.map((item)=>(
      <NavLink 
      onClick={() => handleClick && handleClick()}
      key={item.name}
      to={item.to}
      className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'>
        <item.icon className='w-6 h-6 mr-2'/>
        {item.name}
      </NavLink>
    ))}
  </div>
)

const SideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const dispatch = useDispatch()
  const [addPlaylist] = useAddNewPlaylistMutation()
  const handleNewPlaylist = (event) =>{
    event.preventDefault();
    
    const playlistData = {
      playlistName: event.target.playlistName.value,
      description: "New Playlist"
    }
    addPlaylist(playlistData)
    event.target.playlistName.value = ''
    // axios.post(`http://localhost:8080/users/${userId}/playlist`, playlistData)
    // .then((response)=>{
    //   dispatch(setPlaylistsData(response.data))
    // })
    // .catch((err) => console.log(err))
    
  } 

  return(
    <>
    <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
    {/* <img src={logo} alt='logo' className='w-full h-14 object-contain' /> */}
    <NavLinks/>
    <div className='form-control'>
    <form onSubmit={handleNewPlaylist} className='input-group'>
    <input className='input input-bordered w-[10rem]' placeholder='Playlist Name' name='playlistName' />
    <button className='btn btn-square '>ADD</button>
    </form>
    </div>

    </div>

    <div className='absolute md:hidden block top-6 right-3'>
      {mobileMenuOpen ? (<RiCloseLine onClick={() => setMobileMenuOpen(false)} className='w-6 h-6 text-white mr-2' />): 
      <HiOutlineMenu onClick={() => setMobileMenuOpen(true)} className='w-6 h-6 text-white mr-2'/>}
    </div>

    <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition 
    ${mobileMenuOpen ? 'left-0' :'-left-full'}`}>
    {/* <img src={logo} alt='logo' className='w-full h-14 object-contain' /> */}
    <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
    </div>
    
    </>
  )
};

export default SideBar;
