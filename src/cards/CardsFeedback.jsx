import React from 'react'
import Cards from './Cards';
import Spinner from '../components/Spinner';
import Error from '../components/Error';
import { Typography } from '@mui/material';


export default function CardsFeedback({ loading, error, cards, handleDelete, handleLike }) {

    if (loading) return <Spinner />

    if (error) return <Error errorMessage={error} />;

    if (cards & cards.length === 0) {
        return (
            <Typography m={2} >
                Oops... it seems there are no business cards to display
            </Typography >
        )
    }

    if (cards) return <Cards cards={cards} handleDelete={handleDelete} handleLike={handleLike} />;

    return null;
};
