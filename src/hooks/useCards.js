import { useState, useCallback } from "react";
import { useSnack } from "../providers/SnackBarProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routesObject";
import useAxios from "./useAxios";
import { useCurrentUser } from "../providers/UserProvider";

export default function useCards() {
    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const setSnack = useSnack();
    const [card, setCard] = useState();
    const navigate = useNavigate();
    const { user } = useCurrentUser();

    useAxios();


    // All Cards
    const getAllCards = useCallback(async () => {
        try {
            let response = await axios.get(
                "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"
            );
            setCards(response.data);
            setSnack("success", "All cards are here!");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);


    // Card by ID
    const getCardById = useCallback(async (id) => {
        try {
            const response = await axios.get(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`
            );
            const data = response.data;
            setCard(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);


    // user Fav Cards
    const getFavCards = useCallback(async (userID) => {
        setIsLoading(true);
        try {
            const response = await getAllCards();
            const allCards = response.data;
            const favCards = allCards.filter(card => card.likes.includes(userID));
            setCards(favCards);
            setSnack("success", "Favorite cards retrieved successfully!");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [getAllCards, setSnack, setError]);


    // Delete Card
    const handleDelete = useCallback((cardID) => {
        console.log("Card " + cardID + " deleted");
    }, []);


    // Create Card
    const handleCreateCard = useCallback(
        async (cardFromClient) => {
            setError(null);
            setIsLoading(true);
            try {
                const { data } = await axios.post(
                    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards",
                    cardFromClient,
                    { "x-auth-token": localStorage.getItem("My Token") }
                );
                const card = data;
                setCard(card);
                setSnack("success", "A new business card has been created");
                setTimeout(() => {
                    navigate(ROUTES.ROOT);
                }, 1000);
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        },
        [setSnack, navigate]
    );


    // Fav / Unfav a card
    const handleLike = useCallback(async (id) => {
        try {

            const currentCard = await getCardById(id);
            if (!currentCard) {
                throw new Error("Card data is not available.");
            }
            const isFaved = currentCard.likes.includes(user._id);
            if (isFaved) console.log("The card is faved.");

            let updatedFavs;
            if (isFaved) {
                updatedFavs = currentCard.likes.filter(userId => userId !== user._id);
            } else {
                updatedFavs = [...currentCard.likes, user._id];
            }

            // Update the server with the new likes array
            await axios.put(
                `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
                { ...currentCard, likes: updatedFavs },
                { headers: { "x-auth-token": localStorage.getItem("My Token") } }
            );

            // Optionally update local state
            setCards(prevCards =>
                prevCards.map(card =>
                    card._id === id ? { ...card, likes: updatedFavs } : card
                )
            );

            setSnack("success", `Card ${isFaved ? "unliked" : "liked"} successfully!`);
        } catch (error) {
            setError(error.message);
            setSnack("error", "Failed to update like status.");
        }
        setIsLoading(false); // Reset loading state
    }, [card, getCardById, setSnack, setError, setCards]);


    // Get User Cards

    return { cards, card, error, isLoading, getAllCards, handleDelete, handleLike, getCardById, handleCreateCard, getFavCards };
};