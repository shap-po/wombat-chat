import { useParams } from "react-router";
import useAuth from "../hooks/auth";
import { useEffect, useState } from "react";
import { Message } from "../context/AuthContext";

export default function Chat() {
    const { user, getMessages } = useAuth();
    const { chatId } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!chatId) return;
        getMessages({ chatId }).then(setMessages);
    }, [chatId]);

    return (
        <div>
            <h1>Чат {chatId}</h1>
            <p>Ви увійшли як {user?.username}</p>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                        <strong>{message.user.username}</strong>: {message.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}
