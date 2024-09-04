import React, { useEffect, useState } from "react"
import CardModel from "../../models/CardModel";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import { Box, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";
import { useLoadCallback } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function FavoriteCardsPage() {
    const [cards, setCards] = useState([]);
    const { user } = useAuthentication();
    const { searchText, setShowSearch } = useSearch();

    const loadCards = useLoadCallback(async () => {
        const cards = await CardModel.loadAll();
        const favCards = cards.filter(card => card.isLikedBy(user));
        setCards(favCards.filter(card => card.matches(searchText)));
    }, [user]);

    useEffect(() => {
        loadCards();
    }, [loadCards]);

    useEffect(() => {
        setShowSearch(true);
    }, []);

    return (
        <PageContent>
            {
                user &&
                <PaginationProvider itemCount={cards.length}>
                    <Box sx={{ padding: 3, borderRadius: 2, }}>
                        <Typography variant="h4" gutterBottom>
                            Your Favorite Cards
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Welcome to your Fav cards page! Where you may view all the cards you liked!
                        </Typography>
                    </Box>
                    <CardGrid cards={cards} onChange={loadCards} />
                </PaginationProvider>
            }
            {!user && <Navigate to={ROUTES.ROOT} replace />}
        </PageContent>
    );
}