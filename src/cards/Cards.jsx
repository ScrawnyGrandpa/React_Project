import { Container } from '@mui/material'
import CardComponent from './CardComponent';
import { useEffect } from 'react';


export default function Cards({ cards, handleDelete, handleLike, handleEdit }) {

    useEffect(() => { console.log(cards); }, [])

    return (
        <Container sx={{ display: "flex", flexWrap: "wrap" }}>
            {cards.map(card => <CardComponent
                card={card}
                key={card._id}
                cardId={card._id}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike} />)}
        </Container>
    )
};
