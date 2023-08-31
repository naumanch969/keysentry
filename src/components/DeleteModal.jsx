import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase'
import { PasswordContext } from '../context/PasswordContext'

const DeleteModal = () => {

  ////////////////////////////////////// VARIABLES ///////////////////////////////////////
  const { openDeleteModal, setOpenDeleteModal, selectedPasswordId, setSelectedPasswordId, setPasswords, passwords } = useContext(PasswordContext)

  ////////////////////////////////////// STATES ///////////////////////////////////////
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  ////////////////////////////////////// STATES ///////////////////////////////////////
  useEffect(() => {
    error && alert('For some reasons, Your delete request has not been processed')
  }, [error])

  ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
  const handleDelete = async () => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, 'passwords', selectedPasswordId))
      setPasswords(passwords.filter(p => p._id != selectedPasswordId))
      setLoading(false)
    } catch (err) {
      setError(err.message)
    }

    setOpenDeleteModal(false)
    setSelectedPasswordId(null)
  }
  const handleClose = () => {
    setOpenDeleteModal(false)
  }

  return (
    <Dialog open={openDeleteModal} onClose={handleClose}  >
      <div className="flex flex-col w-auto h-auto bg-neutral-900  " >
        <DialogTitle className='text-neutral-100'>
          Delete the User?
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='text-neutral-100'>
            <span className="text-neutral-100">Are you sure you want to delete this project?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose} className="flex gap-[4px] px-[10px] py-[4px] rounded-[4px] border-[1px] border-neutral-400 text-neutral-400 bg-inherit cursor-pointer  " >Close</button>
          <button onClick={handleDelete} className="flex gap-[4px] px-[10px] py-[6px] rounded-[4px] bg-neutral-700 text-white cursor-pointer  " >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </DialogActions>
      </div>
    </Dialog >
  )
}

export default DeleteModal