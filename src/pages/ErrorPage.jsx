import React from 'react'
import PageHeader from '../components/PageHeader';
import { Box, Divider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ROUTES from '../router/routesObject';
import Stack from '@mui/material/Stack';

export default function ErrorPage() {
    return (
        <>
            <PageHeader title="Error 404" subtitle="Page not found" />
            <Stack direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}>
                <Typography>

                    Oops! It looks like the page you're looking for doesn't exist. It might have been moved or deleted. <br />

                    <Link to={ROUTES.ROOT}>Back to HOME page</Link> or try use the search bar to find what you’re looking for. <Link to={ROUTES.ABOUT}>feel free to contact us</Link> If you need further assistance.</Typography>
                <Box
                    component="img"
                    sx={{
                        height: 533,
                        width: 560,
                        maxHeight: { xs: 233, md: 567 },
                        maxWidth: { xs: 350, md: 560 },
                    }}
                    alt="Blep"
                    src="../../WhatsApp Image 2024-06-12 at 10.59.58.jpeg"
                />
            </Stack>
            {/*<Link to={ROUTES.ROOT}>HOME</Link> */}
        </>
    )
}
