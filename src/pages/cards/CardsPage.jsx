import { useEffect, useState } from "react";
import CardModel from "../../models/CardModel";
import AddCardButton from "../../components/cards/AddCardButton";
import { useAuthentication } from "../../providers/AuthenticationProvider";
import PaginationProvider from "../../providers/PaginationProvider";
import CardGrid from "../../components/cards/CardGrid";
import { useSearch } from "../../providers/SearchProvider";
import { Box, Typography } from "@mui/material";
import { useTheme } from "../../providers/ThemeProvider";
import { useLoadCallback, usePageUI } from "../../providers/PageUIProvider";
import PageContent from "../../components/layout/PageContent";

export default function CardsPage() {
    const [isFirstLoad, setIsFirstLoad] = useState();
    const [cards, setCards] = useState([]);
    const { searchText, setShowSearch } = useSearch();
    const { user } = useAuthentication();
    const { theme } = useTheme();
    const { setNotification } = usePageUI();

    const loadCards = useLoadCallback(async () => {
        const cards = await CardModel.loadAll();
        setCards(cards.filter(card => card.matches(searchText)));
    }, [searchText]);

    useEffect(() => {
        loadCards().then(() => {
            setNotification({
                message: "Cards Loaded Successfully",
                severity: "success"
            })
        });
    }, []);

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
        } else {
            loadCards();
        }
    }, [searchText]);

    useEffect(() => {
        setShowSearch(true);
    }, []);

    return (
        <PageContent>
            <PaginationProvider itemCount={cards.length}>
                <Box sx={{ borderRadius: 2, color: theme.palette.text.primary, marginTop: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Welcome to KCard
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our platform to creating and managing business cards!
                    </Typography>
                </Box>
                <CardGrid cards={cards} onChange={loadCards} />
            </PaginationProvider>
            {user?.isBusiness && <AddCardButton />}
        </PageContent>
    );
}