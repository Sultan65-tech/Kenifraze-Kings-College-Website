import React from 'react'
import { Outlet } from 'react-router-dom'
import "../styles/app.layouts.css"
import Header from "./Header"
import Sidebar from "./Sidebar"


const index = () => {
  return (
    <>
    <Header/>
    <Sidebar/>
    <Outlet/>
    </>
  )
}

export default index