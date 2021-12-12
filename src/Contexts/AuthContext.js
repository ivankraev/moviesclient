import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
export const AuthContext = React.createContext();
export default function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const user = Boolean(localStorage.getItem('user'))
    const [isAuthenticated, setIsAuthenticated] = useState(user);
    const setAuthentication = () => {
        setIsAuthenticated(prevstate => !prevstate)
    }

    //LOGOUT TRIGGER
    const logout = () => {
        localStorage.removeItem('user')
        setIsAuthenticated(false)
        navigate('/')
    }


    // USERNAME FILTER
    let username = 'nouser'
    if (user) {
        username = JSON.parse(localStorage.getItem('user')).username;
    }


    //AUTH INFORMATION 
    const authenticateManipulator = {
        isAuthenticated,
        setAuthentication,
        logout,
        username
    }
    return (
        <AuthContext.Provider value={authenticateManipulator}>
            {children}
        </AuthContext.Provider>
    )

}