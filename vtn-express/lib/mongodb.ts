import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI as string; // provided by Vercel integration
const options = {};

let client: MongoClient;
let mongoClient: Promise<MongoClient>;

if (!uri) {
    throw new Error("Please add your MongoDB URI to Vercel Environment Variables");
}

// In development, use a global variable so hot reloads don’t create new clients
if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    mongoClient = (global as any)._mongoClientPromise;
} else {
    // In production, always create a new client (since no hot reloads)
    client = new MongoClient(uri, options);
    mongoClient = client.connect();
}

export default mongoClient;
