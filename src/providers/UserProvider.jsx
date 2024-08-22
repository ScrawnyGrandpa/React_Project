import React, { createContext, useContext, useEffect, useState } from 'react'
import { getToken, getUser } from '../services/localStorageService';

export const UserContext = createContext();

export default function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(getToken());

    useEffect(() => {
        if (!user) {
            const userFromLocalStorage = getUser();
            setUser(userFromLocalStorage);
        }
    }, [user]);

    return (
        <>
            <UserContext.Provider value={{ user, setUser, token, setToken }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export const useCurrentUser = () => {
    const context = useContext(UserContext);
    if (context == undefined) {
        throw new Error("useCurrentUser must be used within provider");
    }
    return context;
};