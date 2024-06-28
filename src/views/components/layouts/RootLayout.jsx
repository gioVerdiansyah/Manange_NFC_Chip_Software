import React from 'react'
import PT from '../../../utils/PropType'
import NavbarAdmin from '../fragments/NavbarAdmin'


const RootLayout = ({children}) => {
  return (
    <div>
        <NavbarAdmin/>
        <main>
            {children}
        </main>
    </div>
  )
}

RootLayout.propType = {
    children: PT.node
}

export default RootLayout