import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import { validate } from 'email-validator'

const Register = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState({ username: '', email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [inputError, setInputError] = useState({ username: '', email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!userData.username) return setInputError(pre => ({ ...pre, username: 'Username is required' }))
        if (!userData.email) return setInputError(pre => ({ ...pre, email: 'Email is required' }))
        if (!validate(userData.email)) return setInputError(pre => ({ ...pre, email: 'Invalid email address' }))
        if (!userData.password) return setInputError(pre => ({ ...pre, password: 'Password is required' }))
        if (userData.password.length < 6) return setInputError(pre => ({ ...pre, password: 'Password should be atleast of 6 characters' }))

        try {
            setLoading(true)
            setError(false)
            const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            const data = await setDoc(doc(db, "users", user.uid), userData);
            navigate('/auth/login')
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setUserData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleToggleVisibility = (e) => {
        e.preventDefault()
        setShowPassword(pre => !pre)
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 64px)' }} className='w-full h-auto flex justify-center items-center ' >

            <div className="w-[20rem] h-auto flex flex-col gap-[12px] bg-neutral-800 text-neutral-100 p-[12px] ">

                <h2 className="text-[20px] ">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[8px] ">
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="">Name:</label>
                        <input className='w-full h-[40px] px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] ' type="text" name='username' value={userData.username} onChange={handleChange} />
                        {inputError.username && <span className="text-[12px] text-red-500 w-full  ">{inputError.username}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="email">Email:</label>
                        <input className='w-full h-[40px] px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] ' type="email" name='email' value={userData.email} onChange={handleChange} />
                        {inputError.email && <span className="text-[12px] text-red-500 w-full  ">{inputError.email}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="password">Password</label>
                        <div className="relative w-full">
                            <input className='w-full h-[40px] px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] ' type={showPassword ? 'text' : 'password'} name='password' value={userData.password} onChange={handleChange} />
                            {inputError.password && <span className="text-[12px] text-red-500 w-full  ">{inputError.password}</span>}
                            <button onClick={handleToggleVisibility} className="absolute top-[50%] right-[4px] transform translate-y-[-50%] ">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <button disabled={loading} type='submit' className={`${loading ? 'cursor-not-allowed bg-neutral-600 ' : 'cursor-pointer'} px-[16px] py-[6px] bg-neutral-700 text-neutral-100 rounded-[4px] `}>
                            {loading && !error ? 'Loading...' : 'Register'}
                        </button>
                    </div>
                    <div className="text-[12px] w-full flex justify-center items-center gap-[8px] mt-[8px] ">
                        <span>Already have account?</span>
                        <Link to='/auth/login' className='font-bold underline ' >Login here</Link>
                    </div>
                    {
                        error &&
                        <div className="w-full flex justify-center items-center mt-[8px]  ">
                            <span className="text-[12px] text-red-500 w-full text-center " >
                                Something went wrong.
                            </span>
                        </div>
                    }
                </form>

            </div>

        </div>
    )
}

export default Register