import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/features/userSlice'
import axios from 'axios'
const rhythmBaseUrl = process.env.REACT_APP_BASE_URL


const handleAuth = async (token) => {
    const body = {}
    const res = await axios.post(`${rhythmBaseUrl}/users/profile`, body, {
        headers: {
            'authorization': 'JWT ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
            const profile = res.data
            sessionStorage.setItem('email', profile.email)
            sessionStorage.setItem('username', profile.username)
            sessionStorage.setItem('_id', profile._id)
            // sessionStorage.setItem('guestUser', false)
    
}

const handleSignIn = (userSignIn) => {
    axios.post(`${rhythmBaseUrl}/users/auth/signin`, userSignIn)
        .then((response) => {
            const token = response.data.token
            handleAuth(token)
        }).catch((error) => {
            console.error(error)
        })
}

const handleRegister = async (newUser) => {

    const res = await axios.post(`${rhythmBaseUrl}/users/auth/register`, newUser)
    return res.data
}

const handleGuestRegister = async (newUser) => {
    const res = await axios.post(`${rhythmBaseUrl}/users/auth/register`, newUser)
    return newUser
}

const handleLogout = () => {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('_id')
}

const getCurrentUser = () => {
    const userData = {
        email: sessionStorage.getItem("email"),
        username: sessionStorage.getItem("username"),
        _id: sessionStorage.getItem("_id")
    }
    return userData
}

const handleGuestUser = async () => {
    const random = Math.floor(Math.random() * 1000)
    const newUser = {
        username: `Guest${random}`,
        email: `Guest${random}@gmail.com`,
        password:`guestpass${random.toString()}`,
    }
    const response = await handleGuestRegister(newUser)
    handleSignIn(response)
}

const authService = {
    handleAuth,
    handleSignIn,
    handleRegister,
    handleLogout,
    getCurrentUser,
    handleGuestUser,
    handleGuestRegister,

}

export default authService