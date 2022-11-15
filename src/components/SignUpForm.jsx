import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import authService from '../services/auth.service'

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [passwordValidClass, setPasswordValidClass] = useState("");

    const handleInputChange = (event, setStateFunc) => {
        setStateFunc(event.target.value);
    }

    // const handleConfirmPasswordBlur = () => {
    //     if (isConfirmPasswordValid()) {
    //         setPasswordValidClass('');
    //     } else {
    //         setPasswordValidClass('form__input--invalid');
    //     }
    // }

    const isPasswordValid = () => {
        if (password !== '') {
            return true;
        }
        return false;
    };

    const isConfirmPasswordValid = () => {
        if (confirmPassword !== '' && confirmPassword === password) {
            return true;
        } else {
            return false;
        }
    };

    const isFormValid = () => {
        if (email === '' || !email.includes('@')) {
            return false;
        }
        if (!isPasswordValid()) {
            return false;
        }
        if (!isConfirmPasswordValid()) {
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid()) {
            const newUser = {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
            }
            authService.handleRegister(newUser)
        } else {
            alert("Failed to sign up, you have errors in your form");
            event.target.reset();
            event.target.confirmPassword.focus();
        }
    };
    return (
        <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-8">
                <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
                    <h2>Sign Up for Rhythm</h2>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <label>
                            Username: <input className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                name="username"
                                onChange={e => handleInputChange(e, setUsername)}
                                value={username} />
                        </label>
                        <label>
                            Email: <input className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                name="email"
                                onChange={e => handleInputChange(e, setEmail)}
                                value={email} />
                        </label>


                        <label>
                            Password: <input className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                type="password"
                                name="password"
                                onChange={e => handleInputChange(e, setPassword)}
                                value={password} />
                        </label>

                        <label>
                            Confirm Password: <input className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={e => handleInputChange(e, setConfirmPassword)}
                            // onBlur={handleConfirmPasswordBlur} 
                            />
                        </label>
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm