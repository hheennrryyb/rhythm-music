import React from 'react'
import { useState } from 'react'
import authService from '../services/auth.service'
import toast from 'react-hot-toast';

function SignUpForm({SetToggleForm}) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleInputChange = (event, setStateFunc) => {
        setStateFunc(event.target.value);
    }

    const isPasswordValid = () => {
        if (password.length > 3) {
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
            toast.error(`Must include email with correct format`)
            return false;
        }
        if (!isPasswordValid()) {
            toast.error(`Your password must be longer than 3 characters`)
            return false;
        }
        if (!isConfirmPasswordValid()) {
            toast.error(`Passwords don't match`)
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isFormValid()) {
            const newUser = {
                username: event.target.username.value,
                email: event.target.email.value,
                password: event.target.password.value,
            }
            const res = await authService.handleRegister(newUser)
            if(res !== 'Username already taken'){
                toast.success(`Successfully Created ${newUser.username} Account`)
                SetToggleForm(false)
            }else{
                toast.error(`The Username ${newUser.username} is already taken`)
            }
        } else {
            toast.error(`Please complete register form`)
        }
    };
    return (
        <div className='flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
            <div className="w-full max-w-md space-y-8">
                <form name='form' onSubmit={handleSubmit} className='space-y-6'>
                    <h2 className='text-xl font-bold text-white'>Create A Rhythm Account</h2>
                    <div className="rounded-md shadow-sm">
                        <label>
                            Username: <input className="mb-2 block input input-bordered w-full"
                                type="text"
                                name="username"
                                onChange={e => handleInputChange(e, setUsername)}
                                value={username} />
                        </label>
                        <label>
                            Email: <input className="mb-2 block input input-bordered w-full"
                                type="text"
                                name="email"
                                onChange={e => handleInputChange(e, setEmail)}
                                value={email} />
                        </label>


                        <label>
                            Password: <input className="mb-2 block input input-bordered w-full"
                                type="password"
                                name="password"
                                onChange={e => handleInputChange(e, setPassword)}
                                value={password} />
                        </label>

                        <label>
                            Confirm Password: <input className='mb-2 block input input-bordered w-full'
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={e => handleInputChange(e, setConfirmPassword)}
                            // onBlur={handleConfirmPasswordBlur} 
                            />
                        </label>
                    </div>
                    <button className='btn btn-block'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm