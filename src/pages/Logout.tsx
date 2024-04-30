import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/auth";

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/");
    }, []);

    return <></>;
}
