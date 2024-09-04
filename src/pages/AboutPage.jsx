import React, { useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useTheme } from '../providers/ThemeProvider';
import { useSearch } from '../providers/SearchProvider';

export default function AboutPage() {
    const { theme } = useTheme();
    const { setShowSearch } = useSearch();

    useEffect(() => {
        setShowSearch(false);
    }, []);


    return (
        <Container maxWidth="md" sx={{ color: theme.palette.text.primary }}>
            <Grid container spacing={4} alignItems="stretch">
                <Grid item xs={12} md={8}>
                    <Box sx={{ padding: 3, borderRadius: 2, }}>
                        <Typography variant="h4" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Welcome to our Business Cards platform!
                        </Typography>
                        <Typography variant="body1" paragraph>
                            This project is designed to provide a seamless experience for managing and showcasing business cards. Users can explore a comprehensive database of available cards, register to become business users, and create their own custom cards. Our platform also allows users to add cards to their favorites, which can be viewed on a dedicated favorites page. Each feature, from card creation to favorites management, has its own intuitive page for a smooth user experience.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our website is built using React for a dynamic and responsive user interface, Material-UI (MUI) for a sleek and modern design, and vanilla JavaScript for foundational functionalities. We leverage Object-Oriented Programming (OOP) principles to ensure clean and maintainable code. Additionally, we utilize LocalStorage for efficient data management and JSON Web Tokens (JWT) for secure user authentication and authorization.
                        </Typography>
                        <Typography variant="body1">
                            Thank you for visiting, and we hope you enjoy using our platform to create and manage your business cards!
                        </Typography>
                    </Box>
                </Grid>


                <Grid item xs={12} md={4} sx={{

                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={"../../assets/birbwuff_done.png"}
                        alt="BurbWuff"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: 8
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}