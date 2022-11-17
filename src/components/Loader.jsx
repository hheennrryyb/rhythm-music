import React from 'react'
import Logo from '../assets/Logo.svg'

function Loader() {
  return (
    <div className='w-[100vw] flex justify-center mt-[15%]'>
        <div className='bg-[#272727] w-[18rem] h-[18rem] rounded-lg flex justify-center align-middle animate-slideup'>
         <img src={Logo} alt="Logo" className='animate-[spin_3s_cubic-bezier(.46,0,.57,.99)_infinite] w-[15rem] animate-slideup'/>
         </div>
    </div>
  )
}

export default Loader