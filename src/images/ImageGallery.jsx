import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import "./ImageGallery.css";
import {Link} from "react-router";


export function ImageGallery(props) {


    // eslint-disable-next-line react/prop-types
    const imageElements = props.fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));
    return (
        <div>
            <h2>Image Gallery</h2>
            {/* eslint-disable-next-line react/prop-types */}
            {props.isLoading && "Loading..."}
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}

