import { useState } from "react";

export function UsernamePasswordForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const submitResult = async () => {
        // eslint-disable-next-line react/prop-types
        props.onSubmit(username, password);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handleSubmit");
        console.log(username, password);
        if (!username || !password) {
            setResult({
                type: "error",
                message: `Please fill in your name and email.`,
            });
            return;
        }

        console.log(username, password);

        setIsPending(true);
        submitResult().then(() => {
            setResult({
                type: "success",
                message: `You have succesfully subscribed!`,
            });
            setUsername("");
            setPassword("");
            setIsPending(false);
        });

    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    disabled={isPending}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    disabled={isPending}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit" disabled={isPending}>Submit</button>
            {result && result.type === "error" ? (
                <p style={{ color: "red" }}>Please fill in your username and password</p>
            ) : null}

        </form>
    );

}