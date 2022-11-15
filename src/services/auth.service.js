import React from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/features/userSlice'
import axios from 'axios'


const handleAuth = async (token) => {
    const body = {}
    const res = await axios.post(`http://localhost:8080/users/profile`, body, {
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
    axios.post(`http://localhost:8080/users/auth/signin`, userSignIn)
        .then((response) => {
            const token = response.data.token
            handleAuth(token)
            console.log(token)
        }).catch((error) => {
            console.error(error)
        })
}

const handleRegister = (newUser) => {
    axios.post(`http://localhost:8080/users/auth/register`, newUser)
        .then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.error(error)
        })
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
    console.log(userData)
    return userData
}

const handleGuestUser = () => {
    const random = Math.floor(Math.random() * 1000)
    const guestUser = {
        username: `Guest${random}`,
        email: 'Guest@gmail.com',
        password: { random },
    }
    handleRegister(guestUser)
    sessionStorage.setItem('guestUser', true)
}



const authService = {
    handleAuth,
    handleSignIn,
    handleRegister,
    handleLogout,
    getCurrentUser,
    handleGuestUser,

}

export default authService