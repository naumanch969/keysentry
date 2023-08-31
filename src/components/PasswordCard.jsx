import { Delete, MoreVert, Update, Visibility, VisibilityOff } from "@mui/icons-material"
import { useContext, useState } from "react"
import { PasswordContext } from "../context/PasswordContext"
import { format } from 'timeago.js'

const PasswordCard = ({ password }) => {

    const { setSelectedPasswordId, setCurrentPassword, setOpenCreateEditModal, setOpenDeleteModal } = useContext(PasswordContext)

    const [showPassword, setShowPassword] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    const handleUpdateClick = () => {
        console.log('password', password)
        setCurrentPassword(password)
        setShowMenu(false)
        setOpenCreateEditModal(true)
    }
    const handleDeleteClick = () => {
        setSelectedPasswordId(password._id)
        setShowMenu(false)
        setOpenDeleteModal(true)
    }
    const handleToggleVisibility = (e) => {
        e.preventDefault()
        setShowPassword(pre => !pre)
    }

    return (
        <div className='md:w-[23.5%] sm:w-[48%] w-full flex flex-col p-[8px] bg-neutral-800 border-[1px] border-neutral-500 rounded-[4px] shadow-box ' >

            <div className="flex justify-between items-center">
                <h3 className="text-white text-[22px] capitalize " >{password.name || 'No Name'}</h3>
                <div className="relative">
                    <button onClick={() => setShowMenu(pre => !pre)} className="" ><MoreVert className="text-neutral-500 " /></button>
                    {
                        showMenu &&
                        <div className="transition-all absolute top-full right-0 flex flex-col gap-[8px] p-[8px] rounded-[4px] shadow-box bg-neutral-500 z-[100] ">
                            <button onClick={handleUpdateClick} className="flex gap-[4px] px-[8px] py-[8px] rounded-[4px] bg-neutral-700 text-white cursor-pointer  " ><Update /> Update</button>
                            <button onClick={handleDeleteClick} className="flex gap-[4px] px-[8px] py-[8px] rounded-[4px] bg-neutral-700 text-white cursor-pointer  " ><Delete /> Delete</button>
                        </div>
                    }
                </div>
            </div>
            <p className="text-neutral-200 capitalize text-[14px] mt-[4px] " >{password.description}</p>
            <div className="relative w-full mt-[8px] ">
                <input className={`${showPassword ? 'text-white' : 'text-neutral-200 '} bg-neutral-600 p-[4px] rounded-[4px] w-full bg-inherit border-none outline-none `} type={showPassword ? 'text' : 'password'} value={password.password} readOnly={true} />
                <button onClick={handleToggleVisibility} className="absolute top-[50%] right-[4px] transform translate-y-[-50%] ">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
            </div>


            <div className="flex justify-end items-center mt-[4px] ">
                <span className="text-neutral-200 text-[12px] ">{format(password.createdAt)}</span>
            </div>

        </div>
    )
}

export default PasswordCard