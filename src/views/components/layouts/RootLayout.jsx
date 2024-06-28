import React from 'react'
import PT from '../../../utils/PropType'
import NavbarAdmin from '../fragments/NavbarAdmin'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import BreadCrumbs from '../fragments/BreadCrumbs'


const RootLayout = ({children}) => {
  return (
    <>
        <div className=''>
            <NavbarAdmin/>
            <main className=''>
                <Outlet/>
            </main>
        </div>
        <Toaster richColors/>
    </>
  )
}

RootLayout.propType = {
    children: PT.node
}

export default RootLayout