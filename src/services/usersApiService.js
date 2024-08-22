import axios from "axios";

const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export const login = async (userLogin) => {
    try {
        const response = await axios.post(apiUrl + "/login", userLogin);
        const data = response.data;
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};

export const singup = async (normalizedUser) => {
    try {
        const { data } = await axios.post(apiUrl, normalizedUser);
        return data;
    } catch (e) {
        throw new Error(e.message);
    }
};