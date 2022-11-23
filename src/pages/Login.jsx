import React from 'react'
import { useState } from 'react'
import {SignUpForm, SignInForm} from '../components'
import authService from '../services/auth.service'
import {setIsUserLogin, setUserData} from '../redux/features/userSlice'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';

function Login() {
    const [toggleForm, SetToggleForm] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleGustLogin = async () =>{
            await authService.handleGuestUser()
            toast.success(`Loading Guest User...`)
            setTimeout(()=>{
                toast.success(`Welcome Guest User!`)
                dispatch(setIsUserLogin(true))
                navigate('/')
            },1000)

    }

    return (
        <>
        <div className='w-[100vw] p-5 mb-[15rem]'>
        <div className='flex flex-col items-center justify-center'>
        {toggleForm === true &&
        <div className='card bg-white/10 bg-opacity-10 backdrop-blur-sm animate-slideup w-full sm:w-[30rem] sm:mt-[4rem]'>
        <SignUpForm SetToggleForm={SetToggleForm}/>
        <button className='btn' onClick={()=> SetToggleForm(false)}>Signed Up Already?</button>
        </div>
        }
        {toggleForm === false &&
        <div className='card bg-white/10 bg-opacity-10 backdrop-blur-sm animate-slideup w-full sm:w-[30rem] sm:mt-[4rem]'>
        <SignInForm/>
        <button className='btn' onClick={()=> SetToggleForm(true)} >Haven't Made An Account Yet?</button>
        </div>
        }
        <button className='btn btn-outline mt-10 ' onClick={() => handleGustLogin()}> Guest Account Login </button>
        </div>
        </div>
        </>
    )
}

export default Login