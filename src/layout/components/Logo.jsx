import { Typography } from '@mui/material'
import React from 'react'
import NavBarLink from './NavBarLink';
import ROUTES from '../../router/routesObject';
import { useTheme } from '../../providers/CustomThemeProvider';



export default function Logo() {
    const { theme } = useTheme();
    return (
        <>
            <NavBarLink to={ROUTES.ROOT} >
                <Typography
                    variant="h4"
                    sx={{
                        marginRight: 2,
                        fontFamily: 'fantasy',
                        display: { xs: "none", md: 'inline-flex' }, color: theme.palette.text.primary
                    }}>KCard
                </Typography>
            </NavBarLink >
        </>
    );
}