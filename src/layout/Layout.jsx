import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import AddNewCardButton from "../components/AddNewCardButton";
import { useCurrentUser } from "../providers/UserProvider";

export default function Layout({ children }) {
    const { user } = useCurrentUser();
    return (
        <>
            <Header />
            <Main>{children} {user && <AddNewCardButton />} </Main>
            <Footer />
        </>
    );
};