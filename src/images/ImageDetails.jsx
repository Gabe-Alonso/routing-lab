import { MainLayout } from "../MainLayout.jsx";
import { useImageFetching } from "./useImageFetching.js";
import { useParams } from 'react-router';

export function ImageDetails() {
    const {imageId} = useParams();
    console.log(imageId);
    const { isLoading, fetchedImages } = useImageFetching(imageId, 500);

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
