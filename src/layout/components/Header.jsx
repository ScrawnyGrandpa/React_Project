import { useTheme } from '../../providers/CustomThemeProvider'
import { AppBar, Box, Toolbar } from '@mui/material'
import React from 'react'
import NavBarItem from './NavBarItem'
import ROUTES from '../../router/routesObject'
import RightNavbar from './RightNavBar'
import Logo from './Logo'
import { useCurrentUser } from '../../providers/UserProvider'


export default function Header() {
    const { theme } = useTheme();
    const { user } = useCurrentUser();

    return (
        <>
            <AppBar position='sticky' color='primary' elevation={10}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Logo />
                        <NavBarItem to={ROUTES.ABOUT} label={"ABOUT"} sx={{ color: theme.palette.text.primary }} />
                        {user && <NavBarItem to={ROUTES.FAV_CARDS} label={"FAV CARDS"} sx={{ color: theme.palette.text.primary }} />}
                        {(user && user.isBusiness) && <NavBarItem to={ROUTES.MY_CARDS} label={"MY CARDS"} sx={{ color: theme.palette.text.primary }} />}
                        {(user && user.isAdmin) && <NavBarItem to={ROUTES.SANDBOX} label={"Sandbox"} sx={{ color: theme.palette.text.primary }} />}
                    </Box>
                    <RightNavbar />
                </Toolbar>
            </AppBar>
        </>
    )
};
