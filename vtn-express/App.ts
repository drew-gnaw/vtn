import {requireAdmin} from "./api/middleware";
import cors from "cors";

const express = require("express");
import resourcesHandler from "./api/resources";
import authHandler from "./api/auth";
import adminHandler from "./api/admin";

const app = express();

app.use(cors());
app.use(express.json());

// Mount handlers
app.get("/api/resources", (req: any, res: any) => resourcesHandler(req, res));
app.post("/api/resources", (req: any, res: any) => resourcesHandler(req, res));
app.delete("/api/resources", requireAdmin, (req: any, res: any) => resourcesHandler(req, res));

app.post("/api/auth/login", (req: any, res: any) => authHandler(req, res));

app.all("/api/admin/resources", requireAdmin, (req: any, res: any) => adminHandler(req, res));

app.listen(4321, () => {
    console.log("Server running → http://localhost:4321/api/resources");
});
