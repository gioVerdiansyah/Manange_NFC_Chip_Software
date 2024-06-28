import React from 'react'
import PT from '../../../utils/PropType'
import NavbarAdmin from '../fragments/NavbarAdmin'
import { Outlet } from 'react-router-dom'


const RootLayout = ({children}) => {
  return (
    <div className=''>
        <NavbarAdmin/>
        <main className=''>
            <Outlet/>
        </main>
    </div>
  )
}

RootLayout.propType = {
    children: PT.node
}

export default RootLayout