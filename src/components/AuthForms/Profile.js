import React from 'react'
import styled from 'styled-components'
import './Profile.css'
import { FiSettings } from 'react-icons/fi'
import { BiMoviePlay } from 'react-icons/bi'
import { useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import MySettings from './Settings'
import MyMovies from './MyMovies'
import MyFriends from './Friends'
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import { storage } from '../../firebase'
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";
import { baseUrl } from '../../api'
export default function Profile() {
  const [isMovies, setIsMovies] = useState(true)
  const [isSettings, setIsSettings] = useState(false)
  const [isFriends, setIsFriends] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [profilePic, setProfilePic] = useState("");
  const [file, setFile] = useState()
  const firstbar = css`
position:absolute;
top:72px;
left:82px;
`;
  if (!isEditOpen) {
    const form = document.getElementById('editprofile')
    if (form) {
      form.reset()
    }
  }
  const editProfileHandler = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newName = formData.get('newname')
    if (newName === JSON.parse(localStorage.getItem('user')).name) {
      setIsEditOpen(false)
      return
    }
    const data = { ...JSON.parse(localStorage.getItem('user')), name: newName }
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
    fetch(
      `${baseUrl}/api/users/${JSON.parse(localStorage.getItem('user'))._id
      }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token:
            'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken,
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => res.json())
      .then((res) => {
        const newData = JSON.stringify(res)
        const data = { ...JSON.parse(newData), accessToken }
        localStorage.setItem('user', JSON.stringify(data))
        setIsEditOpen(false)
      })
      .catch((err) => console.log(err))
  }
  const send = (file) => {
    if (!file) return;
    if (file === "deleted") {
      file = ""
    }
    setIsUploading(true)
    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed", (snapshot) => {
        const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (err) => { console.log(err) },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            if (file === "") {
              updateProfilePic(file)
            }
            else {
              updateProfilePic(url);

            }

          })
      }
    )
  }
  const updateProfilePic = (profilePic) => {
    
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken
    fetch(`${baseUrl}/api/users/updatePic/${JSON.parse(localStorage.getItem('user'))._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ profilePic, accessToken })
    })
      .then(res => res.json())
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res));
        setProfilePic(res.profilePic)
        setIsUploading(false)
      })
  }




  return (
    <Container className="maincontainer">
      <div className="personalprofilecontainer">
        <img className="headprofileimage" src={JSON.parse(localStorage.getItem('user')).profilePic !== "" ?
          JSON.parse(localStorage.getItem('user')).profilePic : "img/user2.png"
        } alt="" />

        <form id="editprofile" onSubmit={editProfileHandler}>
          <div
            style={{ display: isEditOpen ? '' : 'none' }}
            className="editnameholder"
          >
             {/* <span>Edit your photo:</span> */}
              <PuffLoader css={firstbar} size={135} color={"white"} loading={isUploading} />
            {JSON.parse(localStorage.getItem('user')).profilePic !== "" ?
              <button type='button' className='deletecurrentphoto' onClick={() => { send("deleted") }}>Delete current photo</button>
              : ''
            }
            <header >
              <form >
                <div >
                  <input
                    type="file"
                    id="file"
                    accept=".jpg,jpeg,png"
                    onChange={(event) => {
                      const file = event.target.files[0]
                      setFile(file)
                    }}
                  />
                </div>
              </form>
              <button type="button" className='uploadbutton' onClick={() => send(file)}>Upload photo</button>
            </header>
         {/*    <span>Edit your name:</span> */}
            <input
              type="text"
              name="newname"
              className="editnameinput"
              defaultValue={
                JSON.parse(localStorage.getItem('user')).name ||
                'Enter your name'
              }
            />
            <div className="savecancelbuttons">
              <input className="savecancelbutton" type="submit" value="Save" />
              <input
                onClick={() => {
                  setIsEditOpen(false)
                }}
                className="savecancelbutton"
                type="button"
                value="Cancel"
                style={{ marginLeft: '10px' }}
              />
            </div>
          </div>
        </form>

        <span
          className="profilename"
          style={{ display: !isEditOpen ? '' : 'none' }}
        >
          {JSON.parse(localStorage.getItem('user')).name || 'Change your name'}
        </span>
        <span
          style={{ display: !isEditOpen ? '' : 'none' }}
          className="accountname"
        >
          {JSON.parse(localStorage.getItem('user')).username}
        </span>
        {
          <button
            onClick={() => {
              setIsEditOpen(true)
            }}
            className="editprofilebutton"
            style={{ display: !isEditOpen ? '' : 'none' }}
          >
            Edit profile
          </button>
        }
      </div>

      <div className="contentholder">
        <nav className="profilenavigation">
          <ul className="profilemenu">
            <li
              className="profilenavitem"
              onClick={() => {
                setIsMovies(false)
                setIsSettings(false)
                setIsFriends(true)
              }}
            >
              <FaUserFriends className="menuicons" />
              Friends
            </li>
            <li
              className="profilenavitem"
              onClick={() => {
                setIsMovies(true)
                setIsFriends(false)
                setIsSettings(false)
              }}
            >
              <BiMoviePlay className="menuicons" />
              Movies
            </li>
            <li
              className="profilenavitem"
              onClick={() => {
                setIsMovies(false)
                setIsFriends(false)
                setIsSettings(true)
              }}
            >
              <FiSettings className="menuicons" />
              Settings
            </li>
          </ul>
        </nav>
        <hr
          className="hr"
          style={{
            transform: isFriends
              ? ''
              : isMovies
                ? 'translateX(145px)'
                : 'translateX(280px)',
            height: '1px',
            border: 'none',
            color: 'red',
            background: 'red',
          }}
        />
        <div className="content">
          <MyMovies isMovies={isMovies} />
          <MySettings isSettings={isSettings} />
          <MyFriends isFriends={isFriends} />
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`


  transition: all 0.2s ease -in -out;
  overflow: auto;
  position: relative;
  display: flex;
  padding: 80px 150px;
  justify-content: center;
  height: 100vh;
  align-items: start;
  @media screen and (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 500px;
  }
  @media screen and (max-width: 880px) {
    padding-left: 220px;
  }
  @media screen and (max-width: 880px) {
    padding-left: 190px;
  }
  @media screen and (max-width: 700px) {
    padding-top: 50px;
  }
  @media screen and (max-height: 780px) {
    padding-top: 130px;
  }
  @media screen and (max-height: 700px) {
    padding-top: 180px;
  }
  @media screen and (max-height: 640px) {
    padding-top: 220px;
  }
  @media screen and (max-height: 600px) {
    padding-top: 250px;
  }
  ::-webkit-scrollbar {
    width: 13px;
  }
  ::-webkit-scrollbar-track {
    background: #141414;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgb(40, 40, 40);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #2b2b2b;
  }
  `
