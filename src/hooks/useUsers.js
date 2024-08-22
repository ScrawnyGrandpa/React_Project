import { useCallback, useState } from "react";
import { useCurrentUser } from "../providers/UserProvider";
import { login } from "../services/usersApiService";
import { getUser, setTokenInLocalStorage } from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../router/routesObject";
import { useSnack } from "../providers/SnackBarProvider";
import useAxios from "./useAxios";

export default function useUsers() {
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const { setUser, setToken } = useCurrentUser();
    const navigate = useNavigate();
    const setSnack = useSnack();

    useAxios();

    const handleLogin = useCallback(async (userLoginInfo) => {
        setIsLoading(true);
        try {
            const userToken = await login(userLoginInfo);
            setTokenInLocalStorage(userToken);
            setToken(userToken);
            setUser(getUser());
            navigate(ROUTES.CARDS);
        } catch (e) {
            setError(e.message);
            setSnack("error", e.message)
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading, error, handleLogin
    };
};