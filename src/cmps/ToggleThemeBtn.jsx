import { useState, useRef, useEffect } from "react";

export function ToggleThemeBtn() {
    const inputToggleTheme = useRef()
    const [themeClass, setThemeClass] = useState('default-app-theme')

    useEffect(() => {
        const htmlElement = document.querySelector('html')
        if (htmlElement) {
            htmlElement.className = themeClass
        }
    }, [themeClass])

    function toggleTheme() {
        console.log('inputToggleTheme:', inputToggleTheme.current.checked)
        if (inputToggleTheme.current.checked) {
            setThemeClass('default-app-theme')
        } else {
            setThemeClass('dark-app-theme')
        }
    }

    return (
        <>
            <input
                type="checkbox"
                className="sr-only"
                id="app-theme"
                ref={inputToggleTheme}
                onChange={toggleTheme}
                defaultChecked 
            />
            <label htmlFor="app-theme" className="toggle">
                <span></span>
            </label>
        </>
    )
}