import { Divider, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '../providers/CustomThemeProvider';

export default function PageHeader({ title, subtitle }) {
    const { theme } = useTheme();

    return (
        <>
            <Typography variant='h2' component="h1" sx={{ ml: "18px", color: theme.palette.text.primary }}>{title}</Typography>
            <Typography variant='h5' component="h2" sx={{ ml: "20px", color: theme.palette.text.primary }}>{subtitle}</Typography>
            <Divider sx={{ my: 2 }} />
        </>
    )
}
