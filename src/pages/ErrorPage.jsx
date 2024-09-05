import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '../providers/ThemeProvider';

export default function ErrorPage() {
    const { isDarkMode, theme } = useTheme();

    return (
        <Container maxWidth="md" sx={{ color: theme.palette.text.primary }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3" color="error" gutterBottom>
                            <ErrorOutlineIcon fontSize="inherit" /> Oops!
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Something went wrong
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We encountered an unexpected error while processing your request. Please try again later or contact support if the issue persists.
                        </Typography>
                        <Typography variant="body1">
                            Return to the <a href="/">homepage</a> or use the navigation menu to find your way back.
                        </Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <img
                        src={"../../assets/errorImage.png"}
                        alt="Error Illustration"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: 8,
                            filter: isDarkMode ? 'invert(100%)' : 'none',
                        }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}