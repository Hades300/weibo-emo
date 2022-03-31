import React from 'react'
import Sidebar from '../sidebar/sidebar'
import { Outlet } from 'react-router-dom'
import "./layout.css"

export default function Layout() {
  return (
    <div className='layout-container'>
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="content">
            <Outlet/>
            12321
        </div>
    </div>
  )
}
