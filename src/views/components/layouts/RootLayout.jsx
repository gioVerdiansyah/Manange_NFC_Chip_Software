import React from 'react'
import PT from '../../../utils/PropType'
import NavbarAdmin from '../fragments/NavbarAdmin'


const RootLayout = ({children}) => {
  return (
    <div className=''>
        <NavbarAdmin/>
        <main className=''>
            {children}
        </main>
    </div>
  )
}

RootLayout.propType = {
    children: PT.node
}

export default RootLayout