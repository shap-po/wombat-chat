import { useParams, redirect, Link } from "react-router-dom";
import useAuth from "../hooks/auth";
import { FormEvent } from "react";

import styles from "./Auth.module.css";

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
        <div className={styles.auth}>
            <form onSubmit={submit}>
                <h1>{registering ? "Реєстрація" : "Вхід"}</h1>
                <div className={styles.formFields}>
                    <label htmlFor="name" className={styles.requiredField}>
                        Нікнейм
                    </label>
                    <input type="text" name="name" required />
                    {registering && (
                        <>
                            <label htmlFor="email">E-mail</label>
                            <input type="text" name="email" />
                        </>
                    )}
                    <label htmlFor="password" className={styles.requiredField}>
                        Пароль
                    </label>
                    <input type="password" name="password" required />
                    {registering && (
                        <>
                            <label htmlFor="password2" className={styles.requiredField}>
                                Повторіть пароль
                            </label>
                            <input type="password" name="password2" required />
                        </>
                    )}
                </div>
                <button type="submit">{registering ? "Зареєструватись" : "Увійти"}</button>

                <Link to={registering ? "/login" : "/register"}>{registering ? "Увійти" : "Зареєструватись"}</Link>
            </form>
        </div>
    );
}
