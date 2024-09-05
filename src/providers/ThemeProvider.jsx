import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

const DARKMODE_STORAGE_KEY = "darkmode";

const ThemeContext = createContext();

const lightPalette = {
    primary: {
        main: '#0B668A', // NavBar Color
    },
    background: {
        default: '#C3D5E6', // Website background
        paper: '#F3F4F7', // card background
    },
    text: {
        primary: '#000000', // Black
        secondary: '#757575', // Medium Gray
    },
};

const darkPalette = {
    primary: {
        main: '#1499CE', // Light Green
    },
    background: {
        default: '#282B33', // Website background
        paper: '#2F3036', // Card background

    },
    text: {
        primary: '#ffffff', // White
        secondary: '#b0bec5', // Light Gray Blue
    },
};

export default function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(!!JSON.parse(localStorage.getItem(DARKMODE_STORAGE_KEY)));
    const setDarkMode = useCallback(value => {
        localStorage.setItem(DARKMODE_STORAGE_KEY, JSON.stringify(value));
        setIsDarkMode(value);
    }, []);

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? "dark" : "light",
            ...(isDarkMode ? darkPalette : lightPalette),
        }
    });

    const ctx = { isDarkMode, setIsDarkMode: setDarkMode, theme };

    return (
        <MUIThemeProvider theme={theme}>
            <ThemeContext.Provider value={ctx}>
                {children}
            </ThemeContext.Provider>
        </MUIThemeProvider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}