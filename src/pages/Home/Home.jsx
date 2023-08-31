import { Add, Search } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import { CreateEditModal, DeleteModal, PasswordCard } from '../../components'
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { PasswordContext } from '../../context/PasswordContext'
import { db } from '../../firebase'
import { CircularProgress } from '@mui/material'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'


const Home = () => {

  /////////////////////////////////////// VARAIABLES /////////////////////////////////////////
  const { loggedUser, passwords, setPasswords, setOpenCreateEditModal } = useContext(PasswordContext)

  /////////////////////////////////////// STATES /////////////////////////////////////////////
  const [searchValue, setSerachValue] = useState('')
  const [filteredPasswords, setFilteredPasswords] = useState(passwords)
  const [loading, setLoading] = useState(false)

  /////////////////////////////////////// USE EFFECT /////////////////////////////////////////////
  useEffect(() => {
    const call = async () => {
      setLoading(true)

      const data = await getDocs(query(collection(db, 'passwords'), where('userId', '==', loggedUser._id)))
      let list = []
      data.forEach((doc) => {
        const document = doc.data()
        const documentId = doc.id
        list.push({ ...document, _id: documentId })
      });
      setPasswords(list)

      setLoading(false)
    }
    Boolean(loggedUser) && call()

  }, [])
  useEffect(() => {
    const searchTerm = searchValue.toLowerCase();

    const filtered = passwords.filter(password =>
      password.name.toLowerCase().includes(searchTerm) ||
      password.description.toLowerCase().includes(searchTerm) ||
      password.password.toLowerCase().includes(searchTerm)
    )

    setFilteredPasswords(filtered);
  }, [searchValue, passwords]);

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////


  return (
    <div className='flex flex-col gap-[2rem] w-full px-[2rem] py-[8px] ' >

      <CreateEditModal />
      <DeleteModal />


      {
        !Boolean(loggedUser)
          ?
          <div className="min-h-[30rem] w-full flex justify-center items-center ">
            <Link to='/auth/register' className="bg-neutral-700 text-neutral-100 px-[1rem] py-[8px] rounded-[4px] ">Get Started</Link>
          </div>
          :
          <>

            <div className="flex justify-end items-center gap-[1rem] w-full ">
              <div className=" h-[40px] w-[20rem] flex justify-between items-center bg-neutral-800 text-neutral-100 border-[1px] border-soft-dark rounded-[4px]  ">
                <input className='w-[80%] h-full bg-inherit outline-none border-none px-[8px] ' type="text" placeholder='Search Password...' value={searchValue} onChange={(e) => setSerachValue(e.target.value)} />
                <button className="w-[20%] h-full bg-neutral-700 text-neutral-100 "><Search /></button>
              </div>
              <div className="">
                <button onClick={() => setOpenCreateEditModal(true)} className='w-[3rem] h-[3rem] rounded-full shadow-md bg-neutral-700 text-neutral-100 ' ><Add /></button>
              </div>
            </div>

            {
              passwords.length == 0
                ?
                <div className="min-h-[30rem] w-full flex justify-center items-center ">
                  <span className="text-neutral-500 text-[24px] ">Your saved passwords will appear here</span>
                </div>
                :
                <>
                  {
                    loading
                      ?
                      <div className="flex justify-center items-center min-h-[20rem] w-full ">
                        <CircularProgress style={{ color: '#555', width: '3rem', height: '12rem' }} />
                      </div>
                      :
                      <div className="flex flex-col gap-[1rem] ">
                        {
                          searchValue &&
                          <h3 className="text-[24px] text-neutral-400 font-medium ">Search results for <span className='text-white font-semibold ' >{searchValue}</span></h3>
                        }
                        <div className="flex justify-center flex-wrap gap-[1rem] ">
                          {
                            filteredPasswords.map((password, index) => (
                              <PasswordCard
                                key={index}
                                password={password}
                              />
                            ))
                          }
                        </div>
                      </div>
                  }
                </>
            }

          </>
      }

    </div>
  )
}

export default Home