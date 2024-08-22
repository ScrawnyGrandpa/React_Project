// HomePage Responsible for CardsPage Display
import React, { useEffect } from 'react'
import PageHeader from '../components/PageHeader';
import CardsFeedback from '../cards/CardsFeedback';
import useCards from '../hooks/useCards';

export default function HomePage() {
    const { handleDelete, handleLike, isLoading, error, cards, getAllCards } = useCards();

    useEffect(() => {
        getAllCards();
    }, []);

    return (
        <>
            <PageHeader title="Our Cards" subtitle="A Showcase of Creative and Custom Business Cards to Represent Your Business with Style." />
            <CardsFeedback loading={isLoading} error={error} cards={cards} handleDelete={handleDelete} handleLike={handleLike} />
        </>
    )
};
