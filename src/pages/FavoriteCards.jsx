import React, { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import { useCurrentUser } from '../providers/UserProvider'
import { Navigate } from 'react-router-dom';
import ROUTES from '../router/routesObject';
import useCards from '../hooks/useCards';
import CardsFeedback from '../cards/CardsFeedback';

export default function FavoriteCards() {
    const { user } = useCurrentUser();
    const { handleDelete, handleLike, isLoading, error, cards, getFavCards } = useCards();

    useEffect(() => {
        getFavCards();
    }, []);

    if (!user) return <Navigate to={ROUTES.ROOT} replace />;

    if (user) {
        return (
            <>
                <PageHeader title='Favorited Cards' subtitle='Welcome to your favorite cards page' />
                <CardsFeedback loading={isLoading} error={error} cards={cards} handleDelete={handleDelete} handleLike={handleLike} />
            </>
        )
    }
}
