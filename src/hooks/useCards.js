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

    const apiURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards"

    // All Cards
    const getAllCards = useCallback(async () => {
        try {
            let response = await axios.get(apiURL);
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
            const response = await axios.get(`${apiURL}/${id}`);
            const data = response.data;
            setCard(data);
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, []);


    // Get User Cards
    const getUserCards = useCallback(async (userID) => {
        setIsLoading(true);
        try {
            await getAllCards();
            const userCards = cards.filter(card => card.user_id.includes(userID));
            setCards(userCards);
            setSnack("success", "User cards retrieved successfully!");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [cards, setSnack, setError]);


    // user Fav Cards
    const getFavCards = useCallback(async (userID) => {
        setIsLoading(true);
        try {
            await getAllCards();
            const favCards = cards.filter(card => card.likes.includes(userID));
            setCards(favCards);
            setSnack("success", "Favorite cards retrieved successfully!");
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [cards, setSnack, setError]);


    // Edit card - needs work and test
    const handleEdit = useCallback(async (id, updatedCard) => {
        try {
            const response = await axios.put(`${apiURL}/${id}`, updatedCard);
            setCards((prevCards) =>
                prevCards.map((card) => (card.id === id ? response.data : card))
            );
        } catch (err) {
            setError(err.message);
        }
    }, [setError]);


    // Delete Card - needs work and test
    const handleDelete = useCallback(async (id) => {
        try {
            await axios.delete(`${apiURL}}/${id}`);
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));
        } catch (err) {
            setError(err);
        }
    }, []);


    // Create Card - needs work and test
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


    // Fav / Unfav a card - CHATGPT suggestion - startign point.
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

            setSnack("success", `Card ${isFaved ? "unliked" : "liked"} successfully!`);
        } catch (error) {
            setError(error.message);
            setSnack("error", "Failed to update like status.");
        }
        setIsLoading(false); // Reset loading state
    }, [card, getCardById, setSnack, setError, setCards]);




    return { cards, card, error, isLoading, getAllCards, handleDelete, handleEdit, handleLike, getCardById, handleCreateCard, getFavCards, getUserCards };
};