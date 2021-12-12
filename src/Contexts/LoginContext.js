import React from "react";
import { useState } from "react";
export const LoginContext = React.createContext();
export default function LoginContextProvider({ children }) {
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(0);

    // COLLECTING LOGIN/REGISTER ERRORS
    const setErrorFunc = (value) => {
        setError(value)
    };

    //LOADING BAR
    const setIsLoadingFunc = (value) => {
        setIsLoading(value)
    };
    const modalManipulator = {
        error,
        isLoading,
        setErrorFunc,
        setIsLoadingFunc,
    }
    return (
        <LoginContext.Provider value={modalManipulator}>
            {children}
        </LoginContext.Provider>
    )

}