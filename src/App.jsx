import { Home, Login, Register } from './pages'
import { Navbar } from './components'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { PasswordContext } from './context/PasswordContext'

const App = () => {

  const { loggedUser } = useContext(PasswordContext)

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 ">

      <Navbar />

      <div className="flex">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/register' element={Boolean(loggedUser) ? <Navigate to='/' /> : <Register />} />
          <Route path='/auth/login' element={Boolean(loggedUser) ? <Navigate to='/' /> : <Login />} />
        </Routes>
      </div>

    </div>
  )
}

export default App