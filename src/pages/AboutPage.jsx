import React from 'react'
import PageHeader from '../components/PageHeader';
import { Box, Divider, Typography } from '@mui/material'
import Stack from '@mui/material/Stack';
import { useTheme } from '../providers/CustomThemeProvider';

export default function AboutPage() {
    const { theme } = useTheme();
    return (
        <>
            <PageHeader title="About" subtitle="On this page you can find explanations about using the application" />
            <Stack direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}>
                <Typography sx={{ color: theme.palette.text.primary }}>Welcome to our Card Vault, your ultimate solution for creating, organizing, and storing a diverse range of cards—from business contacts and job applications to food recipes and personal notes. Our platform offers seamless options to craft custom cards tailored to your needs, favorite essential ones for quick access, and easily view all your creations on your personalized “My Cards” page. With CardVault, managing and retrieving important information has never been easier. Whether you’re a professional, a foodie, or just someone who loves organization, CardVault helps you keep everything in one place, making your life more streamlined and efficient.</Typography>
                <Box
                    component="img"
                    sx={{
                        height: 533,
                        width: 650,
                        maxHeight: { xs: 233, md: 567 },
                        maxWidth: { xs: 350, md: 650 },
                    }}
                    alt="BirbWuff"
                    src="./assets/birbwuff_done.png"
                />
            </Stack>
        </>
    )
}
