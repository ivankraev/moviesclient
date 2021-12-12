import React from 'react'
import styled from 'styled-components'
import './Profile.css'

export default function MySettings({ isSettings }) {
  return (
    <Settings
      className="moviescontainer"
      style={{
        transform: isSettings ? '' : 'translateX(600px)',
        opacity: isSettings ? '1' : '0',
        justifyContent:'center'
      }}
    >
        <button className='editprofilebutton' style={{width:'60%',background:'#b00c0c'}}>Delete account</button>

    </Settings>
  )
}

const Settings = styled.div`
  position: absolute;
  top: 0;
  transition: all 0.4s ease-in-out;
  ::-webkit-scrollbar {
    width: 13px;
  }
  ::-webkit-scrollbar-track {
    background: #636363;
    border-radius: 0px 10px 10px 0;
  }
  ::-webkit-scrollbar-thumb {
    background: #4d4d4d;
    border-radius: 0px 10px 10px 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #3b3b3b;
  }
`
