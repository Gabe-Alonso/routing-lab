import {UsernamePasswordForm} from "./UsernamePasswordForm.jsx";
import {sendPostRequest} from "../sendPostRequest.js";
import {useState} from "react";
import {useNavigate} from "react-router";





export function RegisterPage(props) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    function onRegister(username, password) {
        console.log("Inside register");
        console.log(username, password);
        sendPostRequest("/auth/register", {name: username, password: password}).then(res => {
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
            <h1>Register a New Account</h1>
            <UsernamePasswordForm onSubmit={onRegister}></UsernamePasswordForm>
            <p color="red">{error}</p>
        </div>
    );
}