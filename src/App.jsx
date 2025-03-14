import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import {Route, Routes} from "react-router";
import {useEffect, useState} from "react";
import {MainLayout} from "./MainLayout.jsx";
import {useImageFetching} from "./images/useImageFetching.js";
import {RegisterPage} from "./auth/RegisterPage.jsx";
import {LoginPage} from "./auth/LoginPage.jsx";
import {ProtectedRoute} from "./ProtectedRoute.jsx";

function App() {
    const [username, setUsername] = useState("");
    const [authToken, setAuthToken] = useState("");
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    // useEffect(() => {
    //     console.log("Updated username:", username);
    // }, [username]);

    const { isLoading, fetchedImages } = useImageFetching("", authToken);

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<ProtectedRoute authToken={authToken}><Homepage username={username}/></ProtectedRoute>} />
                <Route path="/account" element={<ProtectedRoute authToken={authToken}><AccountSettings username={username} handleUsernameChange={handleUsernameChange} /></ProtectedRoute>} />
                <Route path="/images" element={<ProtectedRoute authToken={authToken}><ImageGallery authToken={authToken} isLoading={isLoading} fetchedImages={fetchedImages} /></ProtectedRoute>} />
                <Route path="/images/:imageId" element={<ProtectedRoute authToken={authToken}><ImageDetails authToken={authToken}/></ProtectedRoute>} />
                <Route path="/register" element={<RegisterPage setAuthToken={setAuthToken} setUsername={setUsername} />} />
                <Route path="/login" element={<LoginPage setAuthToken={setAuthToken} setUsername={setUsername} />} />
            </Route>

        </Routes>
    );
}

export default App
