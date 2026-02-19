import jwt from "jsonwebtoken";

export function requireAdmin(req: any, res: any, next: any) {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

    try {
        jwt.verify(auth.slice(7), process.env.JWT_SECRET!);
        next();
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}