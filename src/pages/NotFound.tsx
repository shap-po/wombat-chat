import style from "./404.module.css";

export default function NotFound() {
    return (
        <div className={style.notFound}>
            <h1>404</h1>
            <p>{"Ой! Сторінку не знайдено :<"}</p>
            <button onClick={() => window.history.back()}>Назад</button>
        </div>
    );
}
