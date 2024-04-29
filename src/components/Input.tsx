import style from "./Input.module.css";

export default function Button({
    label,
    ...props
}: Readonly<{ label?: string } & React.InputHTMLAttributes<HTMLInputElement>>) {
    return label ? (
        <label className={style.label}>
            {label}
            <input className={style.input} {...props} />
        </label>
    ) : (
        <input className={style.input} {...props} />
    );
}
