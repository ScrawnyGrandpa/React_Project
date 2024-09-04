import React, { useEffect, useState } from "react"
import { Box, Typography } from "@mui/material";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Router";
import PaginationProvider from "../../providers/PaginationProvider";
import PageContent from "../../components/layout/PageContent";
import { useLoadCallback } from "../../providers/PageUIProvider";
import { useSearch } from '../../providers/SearchProvider';
import AddCardButton from "../../components/cards/AddCardButton";

export default function MyCardsPage() {
    const [cards, setCards] = useState([]);
    const { user } = useAuthentication();
    const { searchText, setShowSearch } = useSearch();


    const loadCards = useLoadCallback(async () => {
        if (user) {
            const cards = await user.myCards();
            setCards(cards.filter(card => card.matches(searchText)));
        }
    }, [user, searchText]);

    useEffect(() => {
        loadCards();
    }, [loadCards, searchText]);

    useEffect(() => {
        setShowSearch(true);
    }, []);

    return (
        <PageContent>
            {
                user &&
                <PaginationProvider itemCount={cards.length}>
                    <Box sx={{ padding: 3, borderRadius: 2 }}>
                        <Typography variant="h4" gutterBottom>
                            Your Cards
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Welcome to your Cards page! Where you may view all the cards you created!
                        </Typography>
                    </Box>
                    <CardGrid cards={cards} onChange={loadCards} />
                </PaginationProvider>
            }
            {user?.isBusiness && <AddCardButton />}
            {!user && <Navigate to={ROUTES.ROOT} replace />}
        </PageContent>
    );
}