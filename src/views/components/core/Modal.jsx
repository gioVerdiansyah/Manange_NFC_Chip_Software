import React from 'react'
import PT from '../../../utils/PropType'

const Modal = ({
    id,
    children
}) => {
    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
               {children}
            </div>
        </dialog>
    )
}

Modal.propsType={
    id: PT.string,
    children: PT.node
}

export default Modal