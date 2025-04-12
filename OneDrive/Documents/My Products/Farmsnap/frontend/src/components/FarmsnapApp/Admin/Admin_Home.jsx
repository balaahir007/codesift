import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const Admin_Home = () => {
  return (
    <div className='lg:flex lg:gap-62 lg:-mt-6 left-0 w-full absolute flex flex-col   justify-between'>
      <AdminNavbar/>
      <div className='lg:mt-16 md:left-60 md:mt-16 mt-15 lg:left-80 absolute'>
      <Outlet/>
      </div>
    </div>
  )
}

export default Admin_Home
