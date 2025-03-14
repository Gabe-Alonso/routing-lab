import {MongoClient, ObjectId} from "mongodb";

export interface Image {

    _id: string;
    src: string;
    name: string;
    author: string;
    likes: number;
}

export interface Author {
    _id: string;
    username: string;
    email: string;
}



export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(author?: string): Promise<(Image & { author: Author })[]> {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;
        const authorsCollectionName = process.env.USERS_COLLECTION_NAME;

        if (!collectionName || !authorsCollectionName) {
            throw new Error("Missing collection names from environment variables");
        }

        console.log('Using collections:', { collectionName, authorsCollectionName });

        const imagesCollection = this.mongoClient.db().collection<Image>(collectionName);

        const pipeline: any[] = [
            {
                $lookup: {
                    from: authorsCollectionName,
                    localField: 'author',  // This is a string in images
                    foreignField: '_id',   // This is also a string in users
                    as: 'author'
                }
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true // Keep images even if no author found
                }
            }
        ];

        if (author) {
            pipeline.unshift({
                $match: { author }
            });
        }

        const images = await imagesCollection.aggregate(pipeline).toArray();

        console.log('Fetched images:', images);

        return images as (Image & { author: Author })[];
    }

    async createImage(imageId: string, source: string, name: string, author: string) {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;

        if (!collectionName) {
            throw new Error("Missing collection name from environment variables");
        }

        console.log("Using collection:", collectionName);
        console.log("Potential problem 1");
        const imagesCollection = this.mongoClient.db().collection<Image>(collectionName);
        console.log("Potential problem 2");
        // Construct the new image document with ObjectId for _id
        const newImage: Image = {
            _id: imageId,
            src: source,
            name: name,
            likes: 0,
            author: author
        };
        console.log("Potential problem 3");
        // Insert the new image into the database
        const result = await imagesCollection.insertOne(newImage); // Cast to Document
        console.log("Potential problem 4");
        console.log("Insert result:", result);
        console.log("Potential problem 5");
        return result.insertedId;
    }


    async updateImageName(imageId: string, newName: string): Promise<number> {
        const collectionName = process.env.IMAGES_COLLECTION_NAME;

        if (!collectionName) {
            throw new Error("Missing collection name from environment variables");
        }

        console.log('Using collection:', collectionName);

        const imagesCollection = this.mongoClient.db().collection<Image>(collectionName);

        const result = await imagesCollection.updateOne(
            { _id: imageId },
            { $set: { name: newName } }
        );

        console.log('Update result:', result);

        return result.matchedCount;
    }


}

