import { Button } from '@mui/material'
import React from 'react'
import ROUTES from '../router/routesObject'
import { Link } from 'react-router-dom'

export default function AddNewCardButton() {
    return (
        <Link to={ROUTES.CREATE_CARD}>
            <Button variant='contained' color='primary' sx={{ borderRadius: '50%', minWidth: '48px', minHeight: '48px', padding: '0', fontSize: '24px', position: 'fixed', bottom: '70px', right: '15px', zIndex: '10' }}>
                +
            </Button>
        </Link>
    )
};
