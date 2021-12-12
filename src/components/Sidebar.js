import React from 'react'
import styled from 'styled-components'
import { useContext } from 'react';
import { FaHome, FaUsersCog, FaPlus, FaTv, FaSearch } from 'react-icons/fa';
import { ThemeContext } from '../Contexts/ThemeContext';
import { NavLink } from 'react-router-dom'
function Sidebar() {
    const { theme } = useContext(ThemeContext);
    let isDark = theme === 'dark' ? true : theme === 'light' ? false : true;
    return (
        <Container style={{ background: isDark ? '' : '#a6a6a6', boxShadow: isDark ? '' : '1px 0px 15px 1px #404040' }}>
            <i><NavLink to="/" activeClassName="active" className={!isDark ? 'navlinkdark' : 'navlink'}><FaHome /></NavLink></i>
            <i > <NavLink to="/profile" activeClassName="active" className={!isDark ? 'navlinkdark' : 'navlink'}><FaUsersCog /></NavLink></i>
            <i ><NavLink to="/search" activeClassName="active" className={!isDark ? 'navlinkdark' : 'navlink'}><FaSearch/></NavLink></i>
            <i><NavLink to="/movies" activeClassName="active" className={!isDark ? 'navlinkdark' : 'navlink'}><FaTv /></NavLink></i>
            <i ><NavLink to="/add" activeClassName="active" className={!isDark ? 'navlinkdark' : 'navlink'}><FaPlus /></NavLink></i>

        </Container>
    )
}

const Container = styled.div`
transition: all 0.7s ease-in-out;
z-index:4;
box-shadow: 1px 0px 15px 1px rgb(168, 168, 168);
padding: 40px 0px;
width: 50px;
height: 100%;
background-color: black;
position: fixed;
margin-top:-69px;
display: flex;
flex-direction: column;
align-items: center;
color:white;
i{
    font-size: 25px;
    padding-top: 40px;
    transition: all 0.2s ease-in-out;
}

`


export default Sidebar
