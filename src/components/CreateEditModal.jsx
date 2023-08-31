import { Modal } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { db } from '../firebase'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { PasswordContext } from '../context/PasswordContext'

const CreateModal = ({ }) => {

    //////////////////////////////////////// VARIABLE ////////////////////////////////////////
    const initialState = { name: '', description: '', password: '' }
    const { loggedUser, currentPassword, setCurrentPassword, passwords, setPasswords, openCreateEditModal, setOpenCreateEditModal } = useContext(PasswordContext)

    //////////////////////////////////////// STATE ////////////////////////////////////////
    const [inputError, setInputError] = useState({ name: '', description: '', password: '' })
    const [passwordData, setPasswordData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    //////////////////////////////////////// USE EFFECT //////////////////////////////////////
    useEffect(() => {
        if (Boolean(currentPassword)) {
            setPasswordData(currentPassword);
        } else {
            setPasswordData(initialState);
        }
    }, [currentPassword]);
    useEffect(() => {
        setError(false)
        setLoading(false)
    }, [])


    //////////////////////////////////////// FUNCTION ////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordData.name) return setInputError(pre => ({ ...pre, name: 'Name is required' }))
        if (!passwordData.password) return setInputError(pre => ({ ...pre, password: 'Password is required' }))

        try {
            let data;

            setLoading(true)
            if (Boolean(currentPassword)) {
                // Update an existing document
                const result = await updateDoc(doc(db, 'passwords', passwordData._id), passwordData);
                data = { _id: passwordData._id, ...passwordData };
                setPasswords(passwords.map(p => p = p._id == passwordData._id ? data : p))
            } else {
                // Add a new document
                const docRef = await addDoc(collection(db, 'passwords'), { ...passwordData, userId: loggedUser._id });
                data = { _id: docRef.id, ...passwordData };
                setPasswords([data, ...passwords])
            }
            setLoading(false)

            setOpenCreateEditModal(false)
            setPasswordData(initialState)
            setCurrentPassword(null)

        } catch (error) {
            console.log(error);
            setError(error.message)
        }
    }


    const handleChange = (e) => {

        if (e.target.name == 'name') setInputError(pre => ({ ...pre, name: '' }))
        if (e.target.name == 'password') setInputError(pre => ({ ...pre, password: '' }))

        setPasswordData(pre => ({ ...pre, [e.target.name]: e.target.value }))
    }

    const handleToggleVisibility = (e) => {
        e.preventDefault()
        setShowPassword(pre => !pre)
    }


    return (
        <Modal open={openCreateEditModal} onClose={() => setOpenCreateEditModal(false)} className='w-screen h-screen flex justify-center items-center ' >

            <div className="w-[20rem] min-h-[20rem] h-auto flex flex-col gap-[12px] bg-neutral-900 text-neutral-100 p-[12px] ">

                <h2 className="text-[20px] ">Save Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-[8px] ">
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="name">Name *</label>
                        <input className='w-full h-[40px] px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] ' type="text" name='name' value={passwordData.name} onChange={handleChange} />
                        {inputError.name && <span className="text-[12px] text-red-500 w-full  ">{inputError.name}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="description">Descrition</label>
                        <textarea rows='4' className='w-full px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] resize-none ' type="text" name='description' value={passwordData.description} onChange={handleChange} />
                    </div>
                    <div className="flex flex-col">
                        <label className='font-light text-[14px] ' htmlFor="password">Password *</label>
                        <div className="relative w-full">
                            <input className='w-full h-[40px] px-[8px] border-neutral-100 bg-neutral-600 outline-none rounded-[4px] ' type={showPassword ? 'text' : 'password'} name='password' value={passwordData.password} onChange={handleChange} />
                            {inputError.password && <span className="text-[12px] text-red-500 w-full  ">{inputError.password}</span>}
                            <button onClick={handleToggleVisibility} className="absolute top-[50%] right-[4px] transform translate-y-[-50%] ">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <button type='submit' className="px-[16px] py-[6px] bg-neutral-700 text-neutral-100 rounded-[4px] ">
                            {(loading && !error) ? Boolean(currentPassword) ? 'Updating...' : 'Creating...' : Boolean(currentPassword) ? 'Update' : 'Create'}
                        </button>
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

        </Modal>
    )
}

export default CreateModal