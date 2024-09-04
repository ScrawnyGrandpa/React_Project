import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FavoriteCardsPage from "./pages/cards/FavoriteCardsPage";
import MyCardsPage from "./pages/cards/MyCardsPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import SandboxPage from "./pages/admin/SandboxPage";
import LoginPage from "./pages/users/LoginPage";
import RegisterPage from "./pages/users/RegisterPage";
import CardInfoPage from "./pages/cards/CardInfoPage";
import ErrorPage from "./pages/ErrorPage";
import CardFormPage from "./pages/cards/CardFormPage";

export const ROUTES = {
    ROOT: "/",
    ABOUT: "/about",
    CARDS: "/cards",
    MY_CARDS: "/my-cards",
    FAV_CARDS: "/fav-cards",
    CARD_INFO: "/card-info",
    CREATE_CARD: "/create-card",
    EDIT_CARD: "/edit-card",
    SIGNUP: "/signup",
    LOGIN: "/login",
    USER_PROFILE: "/user-info",
    EDIT_USER: "/edit-user",
    SANDBOX: "/sandbox",
};

export default function Router() {

    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path={ROUTES.CARDS} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.FAV_CARDS} element={<FavoriteCardsPage />} />
            <Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
            <Route path={ROUTES.USER_PROFILE} element={<UserProfilePage />} />
            <Route path={ROUTES.CREATE_CARD} element={<CardFormPage />} />
            <Route path={ROUTES.EDIT_CARD + "/:id"} element={<CardFormPage />} />
            <Route path={ROUTES.USER_PROFILE + "/:id"} element={<UserProfilePage />} />
            <Route path={ROUTES.SANDBOX} element={<SandboxPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<RegisterPage />} />
            <Route path={ROUTES.CARD_INFO + "/:id"} element={<CardInfoPage />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
};
