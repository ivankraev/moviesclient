import React from "react";
import { useState } from "react";
export const ModalContext = React.createContext();
export function ModalContextProvider({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const modalStateHandler = () => {
        setIsOpen((prevstate) => !prevstate);
    };
     const modalManipulator = {
        isOpen,
        modalStateHandler,
    }
    return (
        <ModalContext.Provider value={modalManipulator}>
            {children}
        </ModalContext.Provider>
    )

}
