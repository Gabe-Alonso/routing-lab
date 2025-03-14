import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import { useParams } from 'react-router';

export function ImageDetails(props) {
    const {imageId} = useParams();
    console.log(imageId);
    // eslint-disable-next-line react/prop-types
    console.log("Image detailes authToken status: " , props.authToken);
    // eslint-disable-next-line react/prop-types
    const { isLoading, fetchedImages } = useImageFetching(imageId, props.authToken, 500);

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    const imageData = fetchedImages[0];
    if (!imageData) {
        return <h2>Image not found</h2>;
    }

    return (
        <div>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </div>
    )
}
