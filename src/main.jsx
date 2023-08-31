import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { PasswordProvider } from './context/PasswordContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <PasswordProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PasswordProvider>
)
