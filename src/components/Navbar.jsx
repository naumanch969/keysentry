import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { useContext, useState } from 'react'
import { PasswordContext } from '../context/PasswordContext'
import { Logout } from '@mui/icons-material'
import Cookies from 'js-cookie'

const Navbar = () => {

  const { loggedUser, setLoggedUser } = useContext(PasswordContext)

  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = () => {
    Cookies.remove('password_manager_logged_user_data')
    setLoggedUser(null)
  }

  return (
    <div className='w-full h-[64px] bg-neutral-800 ' >

      <div className="w-full h-full flex justify-between items-center px-[2rem]  ">

        <Link to='/' className='text-[28px] text-neutral-100 font-semibold ' >Password Manager</Link>

        <div className="flex">
          {
            Boolean(loggedUser)
              ?
              <div className="flex items-center gap-[12px] ">
                <div className="flex items-center gap-[4px] ">
                  <span className="text-neutral-200 text-[18px] capitalize font-medium  ">{loggedUser.username}</span>
                  <Avatar onClick={() => setShowMenu(pre => !pre)} className='capitalize' >{loggedUser?.username.charAt(0)}</Avatar>
                </div>
                <button onClick={handleLogout} className="flex gap-[4px] px-[8px] py-[8px] rounded-[4px] bg-neutral-700 text-white cursor-pointer  " ><Logout /> Logout</button>
              </div>
              :
              <div className="flex gap-[8px] ">
                <Link to='/auth/register' className="px-[16px] py-[8px] bg-neutral-700 text-neutral-100 rounded-[4px] ">Register</Link>
                <Link to='/auth/login' className="px-[16px] py-[8px] border-[1px] border-neutral-700 text-neutral-100 rounded-[4px] ">Login</Link>
              </div>
          }
        </div>

      </div>

    </div>
  )
}

export default Navbar