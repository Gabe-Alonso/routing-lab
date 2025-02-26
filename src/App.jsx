import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import {Route, Routes} from "react-router";
import {useState} from "react";
import {MainLayout} from "./MainLayout.jsx";
import {useImageFetching} from "./images/useImageFetching.js";

function App() {
    const POSSIBLE_PAGES = [
        <Homepage userName="John Doe" />,
        <AccountSettings />,
        <ImageGallery />,
        <ImageDetails imageId="0" />
    ];
//images
    //account

    const [username, setUsername] = useState("");
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    const { isLoading, fetchedImages } = useImageFetching("");

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage username={username}/>} />
                <Route path="/account" element={<AccountSettings username={username} handleUsernameChange={handleUsernameChange} />} />
                <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} />} />
                <Route path="/images/:imageId" element={<ImageDetails />} />
            </Route>


        </Routes>
    );
}

export default App
