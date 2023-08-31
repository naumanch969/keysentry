import Cookies from "js-cookie";
import { createContext, useState } from "react";


export const PasswordContext = createContext()


export const PasswordProvider = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState(Cookies.get('password_manager_logged_user_data') ? JSON.parse(Cookies.get('password_manager_logged_user_data')) : null)

    console.log('loggedUser', loggedUser)

    const [passwords, setPasswords] = useState([])
    const [currentPassword, setCurrentPassword] = useState(null)
    const [selectedPasswordId, setSelectedPasswordId] = useState(null)

    const [openCreateEditModal, setOpenCreateEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)


    return (
        <PasswordContext.Provider value={{
            loggedUser, setLoggedUser,
            passwords, setPasswords,
            selectedPasswordId, setSelectedPasswordId,
            currentPassword, setCurrentPassword,
            openCreateEditModal, setOpenCreateEditModal,
            openDeleteModal, setOpenDeleteModal
        }} >
            {children}
        </PasswordContext.Provider>
    )
}