import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ROUTES from './routesObject'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import FavoriteCards from '../pages/FavoriteCards'
import MyCards from '../pages/UserCards'
import AddCardPage from '../pages/AddCardPage'
import SandBoxPage from '../pages/SandboxPage'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import CardDetailsPage from '../pages/CardDetailsPage'
import ErrorPage from '../pages/ErrorPage'
import EditCardPage from '../pages/EditCardPage'
import UserPage from '../pages/UserPage'


export default function Router() {
    return (
        <Routes>
            <Route path={ROUTES.ROOT} element={<HomePage />} />
            <Route path={ROUTES.CARDS} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path={ROUTES.FAV_CARDS} element={<FavoriteCards />} />
            <Route path={ROUTES.MY_CARDS} element={<MyCards />} />
            <Route path={ROUTES.USER_PROFILE} element={<UserPage />} />
            <Route path={ROUTES.CREATE_CARD} element={<AddCardPage />} />
            <Route path={ROUTES.EDIT_CARD} element={<EditCardPage />} />
            <Route path={ROUTES.SANDBOX} element={<SandBoxPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.CARD_INFO + "/:id"} element={<CardDetailsPage />} />
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    )
};
