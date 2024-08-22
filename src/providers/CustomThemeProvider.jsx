import { createTheme, ThemeProvider } from '@mui/material/styles'
import React, { createContext, useContext, useState } from 'react'

export const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <>
            <ThemeProvider theme={theme}>
                <ThemeContext.Provider value={{ isDark, setIsDark, theme }}>
                    {children}
                </ThemeContext.Provider>
            </ThemeProvider>

        </>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a CustomThemeProvider');
    }
    return context;
};