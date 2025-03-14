import {UsernamePasswordForm} from "./UsernamePasswordForm.jsx";
import {Link, useNavigate} from "react-router";
import {sendPostRequest} from "../sendPostRequest.js";
import {useState} from "react";


export function LoginPage(props) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    function onLogin(username, password) {
        console.log("Inside login");
        console.log(username, password);
        sendPostRequest("/auth/login", {name: username, password: password}).then(res => {
            console.log(res);
            if (res.status >= 300) {
                setError(res.data.message);
            } else {
                setError("");
                // eslint-disable-next-line react/prop-types
                props.setAuthToken(res.data.token);
                // eslint-disable-next-line react/prop-types
                props.setUsername(username);
                console.log("logged", res.data.token);
                navigate("/");
            }
        });
    }

    return (
        <div>
            <h1>Login</h1>
            <UsernamePasswordForm onSubmit={onLogin}></UsernamePasswordForm>
            <p color="red">{error}</p>
            <Link to="/register">Dont have an account? Register Here</Link>
        </div>
    );
}