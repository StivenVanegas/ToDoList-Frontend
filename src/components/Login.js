import { useState } from "react";
import { login } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {

    const { setAuth } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    }

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const handleClickLogin = (e) => {

        e.preventDefault();

        const loginDto = {
            username: username,
            password: password
        };

        login(loginDto)
            .then((response) => checkStatus(response))
            .catch((err) => {
                console.log(err);
            });
    }

    const checkStatus = (response) => {
        const status = response.status;
        if(status === 200){
            response.json()
                .then(json => loginSuccessful(json));
        } else {
            loginFailed();
        }
    }

    const loginSuccessful = (json) => {
        const newToken = json.token;
        const newLoggerUserId = json.userId;
        localStorage.setItem("nevitsToken",newToken);
        localStorage.setItem("nevitsUser",newLoggerUserId);
        setAuth((prev) => ({ ...prev, token: newToken, loggerUserId: newLoggerUserId}));
    }

    const loginFailed = () => {
        console.log("Error al iniciar sesion");
    }

    return(
        <section className="main-container">
            <div className="login-container p-3">
                <h1 className="">Login</h1>
                <form onSubmit={handleClickLogin}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Username" value={username} onChange={handleChangeUsername}/>
                            <label>Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handleChangePassword}/>
                            <label>Password</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary">Log In</button>
                    </div>
                </form>
            </div>
            
        </section> 
    );
}