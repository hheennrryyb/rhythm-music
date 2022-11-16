import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../services/auth.service'
import {setIsUserLogin, setUserData} from '../redux/features/userSlice'
import {useNavigate} from 'react-router-dom'

function SignUpForm() {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleInputChange = (event, setStateFunc) => {
        setStateFunc(event.target.value);
    }

    const isPasswordValid = () => {
        if (password !== '') {
            return true;
        }
        return false;
    };


    const isFormValid = () => {
        if (!isPasswordValid()) {
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            const userSignIn= {
            username: event.target.username.value,
            password: event.target.password.value,
            }
                axios.post(`http://localhost:8080/users/auth/signin`, userSignIn)
                    .then((response) => {
                        const token = response.data.token
                        return authService.handleAuth(token)
                    }).then(()=>{
                        dispatch(setIsUserLogin(true))
                        navigate('/')
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                
        } else {
            alert("Failed to sign up, you have errors in your form");
            event.target.reset();
            event.target.confirmPassword.focus();
        }
    }

    return (
        <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-8">
            <form onSubmit={handleSubmit} className='space-y-6'>
                <h2 className='text-xl font-bold text-white'>Sign In</h2>
                <div className="rounded-md shadow-sm">
                <label>
                    Username: <input className="mb-2 block input input-bordered w-full"
                        type="text"
                        name="username"
                        onChange={e => handleInputChange(e, setUsername)}
                        value={username} />
                </label>
      
     
                <label>
                    Password: <input className="mb-2 block input input-bordered w-full"
                        type="password"
                        name="password"
                        onChange={e => handleInputChange(e, setPassword)}
                        value={password} />
                </label>
                
                </div>
                <button className='btn btn-block'>Sign In</button>
            </form>
            </div>
        </div>
    )
}

export default SignUpForm