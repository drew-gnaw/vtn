import { ObjectId } from "mongodb";
import mongoClient from "../lib/mongodb";

export default async function handler(req: any, res: any) {
  const client = await mongoClient;
  const db = client.db("resources");
  const collection = db.collection("display");

  try {
    if (req.method === "GET") {
      const resources = await collection.find({}).toArray();
      return res.status(200).json(resources);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const { name, description } = body || {};

      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await collection.insertOne({ name, description, createdAt: new Date() });
      return res.status(201).json({ insertedId: result.insertedId });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({ error: "Missing or invalid id" });
      }

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ObjectId format" });
      }

      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Resource not found" });
      }

      return res.status(200).json({ deleted: true });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}