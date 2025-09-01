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
      const { name, description } = req.body; // adjust to your schema
      if (!name || !description) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await collection.insertOne({ name, description, createdAt: new Date() });
      return res.status(201).json({ insertedId: result.insertedId });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
