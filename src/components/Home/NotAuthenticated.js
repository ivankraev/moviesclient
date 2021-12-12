import React from 'react'
import { ModalContext } from '../../Contexts/ModalContext'
import { useContext } from 'react'
function NotAuthenticated() {
    const { modalStateHandler } = useContext(ModalContext)
    return (
        <div className="notauthenticatedcontainer">
            <h1 className='notauthenticatedheader'>You are not authenticated</h1>
            <p className='clickhere'><span onClick={modalStateHandler} style={{ cursor: 'pointer', fontFamily: 'sans-serif', filter: 'brightness(1.5)' }}>click here</span> to sign in</p>
        </div>
    )
}
export default NotAuthenticated
