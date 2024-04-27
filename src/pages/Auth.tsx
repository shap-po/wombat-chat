import { useParams, redirect } from "react-router-dom";
import useAuth from "../hooks/auth";
import { FormEvent } from "react";

import Logo from "../components/Logo";

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
        const name = data.get("name") as string;
        const isParent = data.get("isParent") === "parent";

        // call the appropriate function
        if (registering) {
            await register({ email, password, username: name, is_parent: isParent });
        } else {
            await login({ email, password });
        }

        // redirect to the specified URL
        redirect(redirectTo ?? "/");
    }

    // redirect if the user is already logged in
    if (user) redirect(redirectTo ?? "/");

    return (
        <div className={styles.auth}>
            <div className={styles.header}>
                <Logo />
            </div>

            <h1>{registering ? "Реєстрація" : "Вхід"}</h1>
            <form onSubmit={submit}>
                {registering && (
                    <div className={styles.tabs}>
                        <input type="radio" name="isParent" id="child" checked />
                        <label htmlFor="child">Для дітей</label>
                        <input type="radio" name="isParent" id="parent" />
                        <label htmlFor="parent">Для батьків</label>
                    </div>
                )}
                <div className={styles.formBody}>
                    <div className={styles.formFields}>
                        <label htmlFor="text">E-mail</label>
                        <input type="text" name="email" />
                        <label htmlFor="password">Пароль</label>
                        <input type="password" name="password" />
                        {registering && (
                            <>
                                <label htmlFor="name">Ім ’я</label>
                                <input type="text" name="name" />
                            </>
                        )}
                    </div>
                    <button type="submit">{registering ? "Зареєструватись!" : "Увійти!"}</button>

                    <a href={registering ? "/login" : "/register"}>{registering ? "Увійти" : "Зареєструватись"}</a>

                    <img src="src/assets/wobble.svg" alt="" className={styles.wobble} />
                </div>
            </form>
        </div>
    );
}
