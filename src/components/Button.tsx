import style from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
    children,
    to,
    primary,
    ...props
}: Readonly<{
    children: React.ReactNode;
    to?: string;
    primary?: boolean;
    [key: string]: any;
}>) {
    const className = (primary ? style.primary : "") + " " + style.button;
    return to ? (
        <Link to={to} className={className} {...props}>
            {children}
        </Link>
    ) : (
        <button className={className} {...props}>
            {children}
        </button>
    );
}
