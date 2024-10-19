import { NavLink } from 'react-router-dom';
import { TbUsers } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux'
import { links } from '../assets/constants'
import { Link } from 'react-router-dom';

import authService from '../services/auth.service';
import { setIsUserLogin } from '../redux/features/userSlice'
const NavLinks = ({ handleClick }) => (
  <>
    {links.map((item) => (
      <NavLink
        onClick={() => handleClick && handleClick()}
        key={item.name}
        to={item.to}
        className='flex flex-col justify-start items-center mx-8 text-sm font-medium text-gray-400 hover:text-[#4895ef] '>
        <item.icon className='h-7 w-7 lg:w-6 lg:h-6 ' />
        <p className='hidden lg:block'>{item.name}</p>
      </NavLink>
    ))}
  </>
)

const SideBar = () => {
  const { userData, isUserLogin } = useSelector((state) => state.user)

  const dispatch = useDispatch()


  return (
    <>
      <div className='absolute h-[4rem] bottom-0 left-0 right-0 flex justify-center bg-black/95 backdrop-blur-lg z-10'>

        <div className='flex flex-wrap items-center justify-between md:justify-center md:gap-[10%] w-full px-5 sm:px-[6rem] '>
          <div className="dropdown dropdown-top my-auto ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className=" sm:w-16 rounded-full bg-white/30 p-0">
                {isUserLogin == true ?
                  <img src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${userData?._id}`} />
                  : <TbUsers size={25} className='p-1 w-full h-full' />}
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

              {isUserLogin === false ?
                <li><Link to='/login'><p className='sm:text-base sm:my-1 text-xl my-4 '>Login</p></Link></li> :
                <>
                  <li>
                    <p className="sm:text-base sm:my-1 text-xl my-4 ">
                      Welcome, {userData?.username}!
                    </p>
                  </li>
                  <li onClick={() => {
                    authService.handleLogout()
                    dispatch(setIsUserLogin(false))
                  }}><Link to='/'><p className="sm:text-base sm:my-1 text-xl my-4 ">Logout</p></Link></li>
                </>
              }
              <li>
                <a target="_blank" href="https://github.com/hheennrryyb">
                  <p className="text-sm font-light ">
                    App By Henry Bellman
                  </p>
                </a>
              </li>
            </ul>
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  )
};

export default SideBar;
