import { useParams, redirect, Link } from "react-router-dom";
import useAuth from "../hooks/auth";
import { FormEvent } from "react";

import styles from "./Auth.module.css";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Auth({ registering = false }) {
    const { redirectTo } = useParams();
    const { user, login, register } = useAuth();

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // get form elements
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);

        // get form values
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const password2 = data.get("password2") as string;
        const name = data.get("name") as string;

        // call the appropriate function
        if (registering) {
            if (password !== password2) {
                alert("Паролі не співпадають!");
                return;
            }
            await register({ email, password, username: name });
        } else {
            await login({ username: name, password });
        }

        // redirect to the specified URL
        redirect(redirectTo ?? "/");
    }

    // redirect if the user is already logged in
    if (user) redirect(redirectTo ?? "/");

    return (
        <div className={[styles.auth, registering ? styles.register : ""].join(" ")}>
            <Link to="/" className={styles.logo}>
                <h1>Womchat:</h1>
                <div className={styles.logoBg}>
                    <img src="womchat.svg" alt="Womchat logo" />
                </div>
            </Link>
            <form onSubmit={submit}>
                <h2>{registering ? "Реєстрація" : "Вхід"}</h2>
                <div className={styles.formFields}>
                    <Input
                        label="Логін"
                        type="text"
                        name="name"
                        required
                        {...(registering ? { placeholder: "Літери, цифри, та підкреслення" } : {})}
                    />

                    {registering && <Input label="E-mail" type="text" name="email" placeholder="[Опціонально]" />}

                    <Input
                        label="Пароль"
                        type="password"
                        name="password"
                        required
                        {...(registering ? { placeholder: "12+ знаків" } : {})}
                    />

                    {registering && (
                        <Input label="і ще раз" type="password" name="password2" required placeholder="Повтор паролю" />
                    )}
                </div>
                <div className={styles.controls}>
                    <Button to={registering ? "/login" : "/register"}>
                        {registering ? "Увійти" : "Зареєструватись"}
                    </Button>
                    <Button type="submit" primary>
                        {registering ? "Зареєструватись" : "Увійти"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
