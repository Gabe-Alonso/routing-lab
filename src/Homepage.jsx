import { MainLayout } from "./MainLayout.jsx";
import {ImageEditForm} from "./images/ImageEditForm.jsx";

export function Homepage(props) {
    return (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <h2>Welcome, {props.username}</h2>
            <p>This is the content of the home page.</p>
            <ImageEditForm></ImageEditForm>
        </div>
    );
}
