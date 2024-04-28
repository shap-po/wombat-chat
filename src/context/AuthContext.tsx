import { createContext, useState, useMemo, useEffect } from "react";
import axios from "axios";

type loginParams = { username: string; password: string };
type registerParams = { email: string; username: string; password: string };
type getMessagesParams = { chatId: number | string };

type User = {
    id: number;
    username: string;
    email: string;
};

export type Message = {
    id: number;
    text: string;
    user: User;
};

const defaultContext = {
    user: null as User | null,
    login: async (_params: loginParams) => {},
    logout: async () => {},
    register: async (_params: registerParams) => {},
    getUser: async () => {},

    getMessages: async (_params: getMessagesParams) => [] as Message[],
};

// context for managing authentication state
export const AuthContext = createContext(defaultContext);

// create a new axios client for making requests to the API
const client = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// provider component that wraps the entire application
export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const [user, setUser] = useState(null);

    // fetch the current user when the component mounts
    // useEffect(() => {
    //     client.get("/api/user/").then((response) => {
    //         setUser(response.data);
    //     });
    // }, []);

    // memoize the context value to avoid unnecessary re-renders
    const value = useMemo(
        () => ({
            user,
            login: async (params: loginParams) => {
                const response = await client.post("/login/", params);
                console.log(response);
                setUser(response.data || defaultContext.user);
            },
            logout: async () => {
                const response = await client.post("/logout/");
                console.log(response);
                setUser(null);
            },
            register: async (params: registerParams) => {
                const response = await client.post("/registration/", params);
                console.log(response);
                setUser(response.data || defaultContext.user);
            },
            getUser: async () => {
                const response = await client.get("/api/user/");
                console.log(response);
                setUser(response.data || defaultContext.user);
            },

            getMessages: async (params: getMessagesParams) => {
                const chatId = Number(params.chatId);
                const response = await client.get(`/chat/getjson/${chatId}/`);
                return response.data;
            },
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
