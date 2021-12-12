import React from 'react'
import styled from 'styled-components'
import './Profile.css'

export default function MyFriends({ isFriends }) {
  return (
    <Friends
      className="moviescontainer"
      style={{
        transform: isFriends ? '' : 'translateX(-700px)',
        opacity: isFriends ? '1' : '0',
      }}
    >
        <h1 style={{width:'100%',textAlign:'center',color:'lightgrey', opacity:'0.8', fontSize:'25px', marginTop:'20px'}}>You have 0 friends</h1>

    </Friends>
  )
}

const Friends = styled.div`
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
