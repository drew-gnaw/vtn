import { ObjectId } from "mongodb";
import mongoClient from "../lib/mongodb";

export default async function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const client = await mongoClient;
    const db = client.db("resources");
    const collection = db.collection("display");

    try {
        if (req.method === "GET") {
            const pendingResources = await collection.find({ pending: true }).toArray();
            return res.status(200).json(pendingResources);
        }

        if (req.method === "POST") {
            const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
            const { id, approve } = body || {};

            if (!id || typeof id !== "string") {
                return res.status(400).json({ error: "Missing or invalid id" });
            }

            if (typeof approve !== "boolean") {
                return res.status(400).json({ error: "approve must be a boolean" });
            }

            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid ObjectId format" });
            }

            if (approve) {
                const result = await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: { pending: false } }
                );

                if (result.matchedCount === 0) {
                    return res.status(404).json({ error: "Resource not found" });
                }

                return res.status(200).json({ approved: true });
            } else {
                const result = await collection.deleteOne({ _id: new ObjectId(id) });

                if (result.deletedCount === 0) {
                    return res.status(404).json({ error: "Resource not found" });
                }

                return res.status(200).json({ deleted: true });
            }
        }

        return res.status(405).json({ error: "Method Not Allowed" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}