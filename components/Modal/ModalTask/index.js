import React from 'react'

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black-400 bg-opacity-80">
            <div className="flex justify-start flex-col items-center bg-black-400 p-4 rounded ring-2 ring-white-400">
                {children}
                <button onClick={onClose} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Close</button>
            </div>
        </div>
    )
}

export default Modal
