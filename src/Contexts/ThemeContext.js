import React from "react";
import { useState } from "react";
export const ThemeContext = React.createContext();
export default function ThemeContextProvider({ children }) {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark')
    }
    let localTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(localTheme);
    const toggleOn = () => {
        setTheme((prevstate) => (prevstate === "dark" ? "light" : "dark"));
    }
    localStorage.setItem('theme', theme)

    const themeManipulator = {

        theme: localStorage.getItem('theme'),
        toggleOn
    }
    return (
        <ThemeContext.Provider value={themeManipulator}>
            {children}
        </ThemeContext.Provider>
    )
}
