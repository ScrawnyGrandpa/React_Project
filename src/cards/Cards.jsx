import { Container } from '@mui/material'
import CardComponent from './CardComponent';


export default function Cards({ cards, handleDelete, handleLike }) {

    const handleEdit = (id) => {
        console.log(`Edit button clicked for card with id ${id}`);
    };

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
