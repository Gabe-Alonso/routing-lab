import { useId, useState, useActionState } from "react";

export function ImageUploadForm(props) {
    const id = useId();
    const [imageData, setImageData] = useState("");
    const [title, setTitle] = useState("");

    async function handleFileSelected(e) {
        const inputElement = e.target;
        const fileObj = inputElement.files[0];
        setImageData(await readAsDataURL(fileObj));
    }

    function readAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = (err) => reject(err);
            fr.readAsDataURL(file);
        });
    }

    async function imageUploadAction(prevState, formData) {
        const file = formData.get("image"); // Get file from the form
        const title = formData.get("title");

        const formDataToSend = new FormData();
        formDataToSend.append("image", file);  // Append file as "image"
        formDataToSend.append("title", title);

        try {
            const response = await fetch("/api/images", {
                method: "POST",
                headers: {
                    // eslint-disable-next-line react/prop-types
                    "Authorization": `Bearer ${props.authToken}` // No Content-Type header! Let the browser set it.
                },
                body: formDataToSend, // Send FormData instead of JSON
            });

            if (!response.ok) {
                return { success: false, message: "Upload failed." };
            }

            return { success: true, message: "Image uploaded successfully!" };
        } catch (error) {
            console.error(error);
            return { success: false, message: "Network error occurred." };
        }
    }


    const [state, formAction] = useActionState(imageUploadAction, { success: null, message: "" });

    return (
        <form action={formAction}>
            <div>
                <label htmlFor={id}>Choose image to upload: </label>
                <input
                    name="image"
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    id={id}
                    onChange={handleFileSelected}
                    required
                />
            </div>
            <div>
                <label>
                    <span>Image title: </span>
                    <input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div> {/* Preview img element */}
                {imageData && <img style={{ maxWidth: "20em" }} src={imageData} alt="Preview" />}
            </div>

            <input type="hidden" name="imageData" value={imageData} />
            <button type="submit" disabled={state?.success === false}>Confirm upload</button>

            {state?.message && <p style={{ color: state.success ? "green" : "red" }}>{state.message}</p>}
        </form>
    );
}
