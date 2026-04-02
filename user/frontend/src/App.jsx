import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Dashboard from './components/dashboard'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
      
        {/* <Login></Login> */}
         <Outlet></Outlet>
        
    </>
  )
}

export default App
