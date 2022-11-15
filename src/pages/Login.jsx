import React from 'react'
import { useState } from 'react'
import {SignUpForm, SignInForm} from '../components'

function Login() {
    const [toggleForm, SetToggleForm] = useState(false)
    
    return (
        <>
        {toggleForm === true &&
        <div>
        <SignUpForm/>
        <button onClick={()=> SetToggleForm(false)}>Signed Up Already?</button>
        </div>
        }
        {toggleForm === false &&
        <div>
        <SignInForm/>
        <button onClick={()=> SetToggleForm(true)} >Haven't Made An Account Yet?</button>
        </div>
        }
        </>
    )
}

export default Login