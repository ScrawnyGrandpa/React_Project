import { Box, IconButton } from '@mui/material'
import React from 'react'
import { useTheme } from '../../providers/CustomThemeProvider';
import { LightMode, ModeNight } from '@mui/icons-material';
import { useCurrentUser } from '../../providers/UserProvider';
import Logged from './Logged';
import NotLogged from './NotLogged';
import SearchBar from './SearchBar';

export default function RightNavbar() {
    const { isDark, setIsDark } = useTheme();
    const { user } = useCurrentUser();

    return (
        <Box sx={{
            display: { xs: "none", md: "inline-flex" },
            alignItems: "center"
        }}>
            <SearchBar />
            <IconButton color="inherit" onClick={() => setIsDark(!isDark)}>
                {isDark ? <LightMode /> : <ModeNight />}
            </IconButton>

            {user ? <Logged /> : <NotLogged />}
        </Box>
    )
};
