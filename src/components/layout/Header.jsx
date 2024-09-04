import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, styled, Tooltip, Typography } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../Router"
import { Settings, Logout, LightMode, ModeNight } from "@mui/icons-material/";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { useTheme } from "../../providers/ThemeProvider";
import { useSearch } from "../../providers/SearchProvider";
import SearchInput from "../forms/SearchInput";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { usePageUI } from "../../providers/PageUIProvider";

const NavLink = styled(Link)(({ theme }) => `
  text-decoration: none;
  color: #fff;
  font-family: Roboto;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.75;
  padding: ${theme.spacing(1)};`
);

export default function Header() {
    const anchor = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useAuthentication();
    const { isDarkMode, setIsDarkMode, theme } = useTheme();
    const { searchText, setSearchTextDebounced, showSearch } = useSearch();
    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    const menuItems = [
        <MenuItem key="home" component={Link} to={ROUTES.ROOT} onClick={closeMenu}>Home</MenuItem>,
        <MenuItem key="about" component={Link} to={ROUTES.ABOUT} onClick={closeMenu}>About</MenuItem>,
        <Divider key="divider" />,
        ...user ? [
            <MenuItem key="favorites" component={Link} to={ROUTES.FAV_CARDS} onClick={closeMenu}>Favorites</MenuItem>,
            user.isBusiness && <MenuItem key="my-cards" component={Link} to={ROUTES.MY_CARDS} onClick={closeMenu}>My Cards</MenuItem>,
            user.isAdmin && <MenuItem key="sandbox" component={Link} to={ROUTES.SANDBOX} onClick={closeMenu}>Sandbox</MenuItem>,
        ] : [
            <MenuItem key="signup" component={Link} to={ROUTES.SIGNUP} onClick={closeMenu}>Sign Up</MenuItem>,
            <MenuItem key="login" component={Link} to={ROUTES.LOGIN} onClick={closeMenu}>Login</MenuItem>,
        ]];

    return (
        <AppBar position="sticky" color="primary" elevation={10}>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="8px">
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
                    <Link to={ROUTES.ROOT}>
                        <Typography color={'white'} variant="h4">KCard</Typography>
                    </Link>
                    <NavLink to={ROUTES.ABOUT}>About</NavLink>
                    {user && (
                        <>
                            <NavLink to={ROUTES.FAV_CARDS}>Favorites</NavLink>
                            {user.isBusiness && (<NavLink to={ROUTES.MY_CARDS}>My Cards</NavLink>)}
                            {user.isAdmin && (<NavLink to={ROUTES.SANDBOX}>Sandbox</NavLink>)}
                        </>
                    )}
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                    <IconButton sx={{ color: 'white' }} onClick={toggleMenu} ref={anchor}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchor.current}
                        id="MoreVertUIcon"
                        open={isOpen}
                        onClick={closeMenu}
                        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
                        anchorOrigin={{ horizontal: "left", vertical: "top" }}
                        sx={{ marginTop: 6 }}
                    >
                        {menuItems}
                    </Menu>
                </Box>
                <Box display="flex" gap={1} alignItems="center">
                    {showSearch && <SearchInput defaultValue={searchText} onChange={setSearchTextDebounced} />}
                    <IconButton color="inherit" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <LightMode /> : <ModeNight />}
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {user ?
                            <AccountMenu />
                            :
                            <>
                                <NavLink to={ROUTES.SIGNUP}>Signup</NavLink>
                                <NavLink to={ROUTES.LOGIN}>Login</NavLink>
                            </>
                        }
                    </Box>
                </Box>
            </Box>
        </AppBar>
    )
};

export function AccountMenu() {
    const anchor = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthentication();
    const navigate = useNavigate();
    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    const userProfile = () => {
        navigate(ROUTES.USER_PROFILE);
    };

    return (
        <>
            <Tooltip title="User Settings">
                <IconButton sx={{ p: 0 }} onClick={toggleMenu} ref={anchor}>
                    <Avatar alt="avatar" src="../../assets/avatar.png" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchor.current}
                id="account-menu"
                open={isOpen}
                onClick={closeMenu}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                sx={{ mt: 1.5 }}
            >
                <MenuItem>
                    <Avatar sx={{ mr: 1.5 }} />
                    {user.email}
                </MenuItem>
                <Divider />
                <MenuItem onClick={userProfile}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    User Profile
                </MenuItem>
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}