import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings(props) {
    return (
        <div>
            <h2>Account settings</h2>
            <label>
                {/* eslint-disable-next-line react/prop-types */}
                Username <input value={props.username} onChange={props.handleUsernameChange} />
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
