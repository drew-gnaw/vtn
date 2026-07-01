import jwt from "jsonwebtoken";

export default function handler(req: any, res: any) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== "POST") return res.status(405).end();
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const password = typeof body?.password === "string" ? body.password.trim() : "";
    const adminPassword = (process.env.ADMIN_PASSWORD ?? "").trim();

    if (password !== adminPassword) {
        return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET!, { expiresIn: "8h" });
    return res.status(200).json({ token });
}