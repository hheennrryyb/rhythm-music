import React from 'react'
import { useState } from 'react'
import {SignUpForm, SignInForm} from '../components'
import authService from '../services/auth.service'

function Login() {
    const [toggleForm, SetToggleForm] = useState(false)
    
    return (
        <>
        <div className='w-[100vw]'>
        <div className='flex flex-col items-center justify-center'>
        {toggleForm === true &&
        <div className='card glass w-[30rem] mt-[4rem]'>
        <SignUpForm/>
        <button className='btn' onClick={()=> SetToggleForm(false)}>Signed Up Already?</button>
        </div>
        }
        {toggleForm === false &&
        <div className='card glass w-[30rem] mt-[4rem]'>
        <SignInForm/>
        <button className='btn' onClick={()=> SetToggleForm(true)} >Haven't Made An Account Yet?</button>
        </div>
        }
        <button className='btn btn-outline mt-10 ' onClick={() => authService.handleGuestUser()}> Guest Account Login </button>
        </div>
        </div>
        </>
    )
}

export default Login