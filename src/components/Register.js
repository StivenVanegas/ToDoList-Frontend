import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../services/UserService";

export const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleChangeUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    } 

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const handleSubmit = (e)  => {
        e.preventDefault();
        const isEmpty = username === "" || password === "";
        if(!isEmpty){
            signUp();
        } else {
            console.log("complete los campos");
        }
    }

    const signUp = () => {
        const userDto = {
            username: username,
            password: password
        };

        createUser(userDto)
            .then(response => response.json())
            .then(json => history.push("/"))
            .catch(err => console.log(err));
    }

    return(
        <section className="main-container">
            <div className="login-container p-3">
                <h1 className="">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="Username" value={username} onChange={handleChangeUsername}/>
                            <label>Username</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={handleChangePassword}/>
                            <label>Password</label>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn1">Sign up</button>
                    </div>
                </form>
            </div>
            
        </section> 
    );
}