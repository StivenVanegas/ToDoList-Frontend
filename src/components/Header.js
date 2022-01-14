import { useAuth } from "../contexts/AuthContext";

export const Header = () => {

    const { setAuth } = useAuth();

    const handleLogOut = () => {
        localStorage.setItem("nevitsToken","");
        localStorage.setItem("nevitsUser","");
        setAuth((prev) => ({ ...prev, token: "", loggerUserId: ""}));
    }

    return(
        <header className="header-container py-2">
            <h1 className="m-0">To do list</h1>
            <button className="btn btn-primary" onClick={handleLogOut}>Log out</button>
        </header>
    );
}