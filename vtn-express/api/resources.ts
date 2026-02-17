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
      const { name, description, link, phone_number, categories } = body || {};

      if (!name) {
        return res.status(400).json({ error: "Missing name" });
      }

      if (categories !== undefined && (!Array.isArray(categories) || !categories.every((c) => typeof c === "string"))) {
        return res.status(400).json({ error: "categories must be an array of strings" });
      }

      const doc: Record<string, any> = {
        name,
        categories: Array.isArray(categories) ? categories : [],
        createdAt: new Date(),
      };

      if (description !== undefined) doc.description = description;
      if (link !== undefined) doc.link = link;
      if (phone_number !== undefined) doc.phone_number = phone_number;

      const result = await collection.insertOne(doc);
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