import React from 'react'
import CardHeaderComponent from './CardHeader';
import CardBody from './CardBody';
import CardActionBar from './CardActionBar';
import Card from "@mui/material/Card";
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';


export default function CardComponent({ card, cardId, onDelete, onEdit, onLike, onCall }) {
    const navigate = useNavigate();
    const handleNavigate = () => navigate(`/card-info/${cardId}`);

    return (
        <>
            <Card sx={{ width: 250, m: 2 }}>
                <CardActionArea onClick={handleNavigate}>
                    <CardHeaderComponent image={card.image.url} alt={card.image.alt} title={card.title} subtitle={card.subtitle} />
                    <CardBody phone={card.phone} address={card.address} bizNumber={card.bizNumber} />
                </CardActionArea>
                <CardActionBar cardId={cardId} onDelete={onDelete} onEdit={onEdit} onLike={onLike} />
            </Card>
        </>
    )
}
